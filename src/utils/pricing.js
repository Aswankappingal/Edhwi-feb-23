/**
 * Pricing utility to handle GST-compliant calculations.
 * Consistent across Frontend, Backend, and Invoices.
 */

export const calculateItemPricing = (item, discountShare = 0) => {
    const mrp = parseFloat(item.productDetails?.price || item.price || 0);
    const quantity = parseInt(item.quantity || 1);
    const gstRate = parseFloat(item.gstRate || 5) / 100; // Default 5%

    // Step 1: Extract base price from MRP (per unit)
    const basePriceUnit = Math.round((mrp / (1 + gstRate)) * 100) / 100;
    const basePriceTotal = Math.round(basePriceUnit * quantity * 100) / 100;

    // Step 2: Apply discount share on base (total for this item)
    // Validate discount <= basePrice
    const discount = Math.min(discountShare, basePriceTotal);
    const taxableValue = Math.round(Math.max(0, basePriceTotal - discount) * 100) / 100;

    // Step 3: Calculate GST on taxable value
    const gstAmount = Math.round(taxableValue * gstRate * 100) / 100;
    const cgst = Math.round((gstAmount / 2) * 100) / 100;
    const sgst = Math.round((gstAmount - cgst) * 100) / 100; // Use remaining for sgst to avoid rounding loss

    // Step 4: Individual Item Total
    const itemTotal = Math.round((taxableValue + gstAmount) * 100) / 100;

    return {
        mrp: mrp * quantity,
        basePrice: basePriceTotal,
        discount,
        taxableValue,
        gstAmount,
        cgst,
        sgst,
        total: itemTotal
    };
};

export const calculateCartTotals = (cartItems, totalDiscount = 0, deliveryCharge = 0, codCharge = 0, paymentMethod = 'prepaid') => {
    const items = cartItems || [];
    const isCod = paymentMethod.toLowerCase() === 'cod';
    const activeCodCharge = isCod ? parseFloat(codCharge || 0) : 0;
    const activeDeliveryCharge = parseFloat(deliveryCharge || 0);

    // Initial pass to get base prices for proportional discount distribution
    let totalBasePrice = 0;
    const itemBases = items.map(item => {
        const gstRate = parseFloat(item.gstRate || 5) / 100;
        const mrp = parseFloat(item.productDetails?.price || item.price || 0);
        const quantity = parseInt(item.quantity || 1);
        const basePriceUnit = Math.round((mrp / (1 + gstRate)) * 100) / 100;
        const basePriceTotal = Math.round(basePriceUnit * quantity * 100) / 100;
        totalBasePrice += basePriceTotal;
        return basePriceTotal;
    });

    // Distribute total discount proportionally across items
    let distributedDiscountTotal = 0;
    const itemPricingBreakdown = items.map((item, index) => {
        let discountShare = 0;
        if (totalDiscount > 0 && totalBasePrice > 0) {
            if (index === items.length - 1) {
                // Last item gets the remaining discount to ensure sum == totalDiscount
                discountShare = Math.round((totalDiscount - distributedDiscountTotal) * 100) / 100;
            } else {
                discountShare = Math.round((itemBases[index] / totalBasePrice) * totalDiscount * 100) / 100;
                distributedDiscountTotal += discountShare;
            }
        }
        return calculateItemPricing(item, discountShare);
    });

    // Aggregate totals
    const summary = itemPricingBreakdown.reduce((acc, curr) => {
        acc.totalMrp += curr.mrp;
        acc.basePrice += curr.basePrice;
        acc.discount += curr.discount;
        acc.taxableValue += curr.taxableValue;
        acc.gstAmount += curr.gstAmount;
        acc.cgst += curr.cgst;
        acc.sgst += curr.sgst;
        return acc;
    }, {
        totalMrp: 0,
        basePrice: 0,
        discount: 0,
        taxableValue: 0,
        gstAmount: 0,
        cgst: 0,
        sgst: 0
    });

    // Round aggregated values
    summary.totalMrp = Math.round(summary.totalMrp * 100) / 100;
    summary.basePrice = Math.round(summary.basePrice * 100) / 100;
    summary.discount = Math.round(summary.discount * 100) / 100;
    summary.taxableValue = Math.round(summary.taxableValue * 100) / 100;
    summary.gstAmount = Math.round(summary.gstAmount * 100) / 100;
    summary.cgst = Math.round(summary.cgst * 100) / 100;
    summary.sgst = Math.round(summary.sgst * 100) / 100;

    // Final total including delivery and COD - MUST BE A WHOLE NUMBER to match payment capture
    const total = Math.round(summary.taxableValue + summary.gstAmount + activeDeliveryCharge + activeCodCharge);

    return {
        ...summary,
        delivery: activeDeliveryCharge,
        codCharge: activeCodCharge,
        total,
        itemsPricing: itemPricingBreakdown // Detailed breakdown per item
    };
};
