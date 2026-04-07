import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Convert Number to Words (Indian Number System)
const numberToWords = (num) => {
    if (num === 0) return 'Zero';

    const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    const inWords = (n) => {
        let str = '';
        if (n > 99) {
            str += a[Math.floor(n / 100)] + 'Hundred ';
            n %= 100;
        }
        if (n > 19) {
            str += b[Math.floor(n / 10)] + ' ';
            n %= 10;
        }
        if (n > 0) {
            str += a[n];
        }
        return str.trim();
    };

    let word = '';
    const crore = Math.floor(num / 10000000);
    num %= 10000000;
    const lakh = Math.floor(num / 100000);
    num %= 100000;
    const thousand = Math.floor(num / 1000);
    num %= 1000;
    const wholeNumber = Math.floor(num);

    if (crore > 0) word += inWords(crore) + ' Crore ';
    if (lakh > 0) word += inWords(lakh) + ' Lakh ';
    if (thousand > 0) word += inWords(thousand) + ' Thousand ';
    if (wholeNumber > 0) word += inWords(wholeNumber);

    return word.trim() + ' Only';
};

const safeNum = (val) => {
    const n = parseFloat(val);
    return isNaN(n) ? 0 : n;
};

export const generateInvoice = async (order, returnBlob = false) => {
    // 1. Initialize Document
    const doc = new jsPDF('p', 'pt', 'a4'); // Portrait, Points, A4

    // Helper formatting
    const formatPrice = (val) => safeNum(val).toFixed(2);

    // Document styling constants
    const startX = 40;
    let currentY = 40;

    // --- HEADER SECTION ---

    // Load logo asynchronously
    const logoUrl = '/Images/Edhwi-logo.svg';
    await new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = logoUrl;
        img.onload = () => {
            const originalWidth = img.width || 300;
            const originalHeight = img.height || 100;
            const maxW = 140;
            const maxH = 50;
            const ratio = Math.min(maxW / originalWidth, maxH / originalHeight);
            const renderW = originalWidth * ratio;
            const renderH = originalHeight * ratio;

            const canvas = document.createElement('canvas');
            const scale = 4;
            canvas.width = renderW * scale;
            canvas.height = renderH * scale;
            const ctx = canvas.getContext('2d');
            ctx.scale(scale, scale);
            ctx.drawImage(img, 0, 0, renderW, renderH);

            doc.addImage(canvas.toDataURL('image/png'), 'PNG', startX, currentY, renderW, renderH);
            resolve(true);
        };
        img.onerror = () => {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(24);
            doc.text('EDHWI', startX, currentY + 30);
            resolve(false);
        };
    });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Tax Invoice/Bill of Supply', 550, currentY + 25, { align: 'right' });

    currentY += 80;

    // --- SELLER AND BILLING/SHIPPING SECTION ---
    const leftColX = startX;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Sold By:', leftColX, currentY);

    currentY += 15;
    doc.text('1/152-30', leftColX, currentY);
    doc.setFont('helvetica', 'normal');
    doc.text('ROYAL TRADE CENTRE, BYPASS ROAD,', leftColX, currentY + 15);
    doc.text('PERINTHALMANNA, MALAPPURAM,', leftColX, currentY + 30);
    doc.text('KERALA - 679322', leftColX, currentY + 45);

    currentY += 65;
    doc.setFont('helvetica', 'bold');
    doc.text('GST NO : 32AALCK3699D1ZF', leftColX, currentY);
    doc.text('FSSAI : 11325999000031', leftColX, currentY + 15);

    let rightY = currentY - 80;

    const billingAdrs = order.deliveryAddress || {};
    doc.setFont('helvetica', 'bold');
    doc.text('Billing Address :', 550, rightY, { align: 'right' });
    doc.setFont('helvetica', 'normal');

    const billingName = billingAdrs.fullName || 'N/A';
    const bLines = [
        billingAdrs.addressLine1 || '',
        billingAdrs.addressLine2 || '',
        `${billingAdrs.city || ''}, ${billingAdrs.state || ''}`,
        `INDIA - ${billingAdrs.pincode || ''}`
    ].filter(Boolean);

    rightY += 15;
    doc.text(billingName, 550, rightY, { align: 'right' });
    bLines.forEach(line => {
        rightY += 15;
        doc.text(line, 550, rightY, { align: 'right' });
    });

    rightY += 25;

    doc.setFont('helvetica', 'bold');
    doc.text('Shipping Address :', 550, rightY, { align: 'right' });
    doc.setFont('helvetica', 'normal');

    rightY += 15;
    doc.text(billingName, 550, rightY, { align: 'right' });
    bLines.forEach(line => {
        rightY += 15;
        doc.text(line, 550, rightY, { align: 'right' });
    });

    currentY = Math.max(currentY + 40, rightY + 30);

    const orderId = order.orderId || order.orderNumber || order.id || 'N/A';
    const oDate = order.createdAt ? new Date(
        order.createdAt._seconds ? order.createdAt._seconds * 1000 : order.createdAt
    ) : new Date();
    const formattedDate = isNaN(oDate) ? 'N/A' : oDate.toLocaleDateString('en-GB');

    const paymentMethod = order.payment?.paymentMethod || 'Prepaid';

    doc.setFont('helvetica', 'bold');
    doc.text(`Order Id : ${orderId}`, leftColX, currentY);
    doc.text(`Order Date : ${formattedDate}`, leftColX, currentY + 15);
    doc.text(`Payment Method : ${paymentMethod}`, leftColX, currentY + 30);

    const year = new Date().getFullYear();
    const cleanOrderId = orderId.toString().replace(/\D/g, '');
    const invoicePrefix = `EDH-INV-${year}-${cleanOrderId || orderId}`;
    const invDate = new Date().toLocaleDateString('en-GB');

    currentY += 55;

    doc.text(`Place of supply : ${billingAdrs.state || 'Kerala'}`, leftColX, currentY);
    doc.text(`Place of Delivery : ${billingAdrs.state || 'Kerala'}`, leftColX, currentY + 15);

    const stateInput = (billingAdrs.state || 'Kerala').toLowerCase();
    let stateCode = '32';
    if (stateInput.includes('kerala')) stateCode = '32';
    else if (stateInput.includes('tamil')) stateCode = '33';
    else if (stateInput.includes('karnataka')) stateCode = '29';
    else if (stateInput.includes('maharashtra')) stateCode = '27';

    doc.text(`State Code: ${stateCode}`, leftColX, currentY + 30);
    doc.text(`Invoice No : ${invoicePrefix}`, 550, currentY + 15, { align: 'right' });
    doc.text(`Invoice Date : ${invDate}`, 550, currentY + 30, { align: 'right' });

    currentY += 50;

    const tableBody = [];
    let slNo = 1;
    const items = order.items || order.products || [];
    const pricing = order.pricing || {};

    if (items && items.length > 0) {
        items.forEach(item => {
            const baseName = item.name || item.productDetails?.name || 'Product';
            const variantData = item.variant || item.variants || item.options || item.selectedVariants || item.variantCombination || {};
            let variantString = '';

            if (typeof variantData === 'string') {
                variantString = variantData;
            } else if (variantData && typeof variantData === 'object') {
                if (variantData.variantName || variantData.name) {
                    variantString = variantData.variantName || variantData.name;
                } else if (variantData.variants && typeof variantData.variants === 'object') {
                    variantString = Object.entries(variantData.variants).map(([k, v]) => `${k}: ${v}`).join(', ');
                } else {
                    variantString = Object.entries(variantData)
                        .filter(([k]) => !['variantId', 'id', 'sku', 'price', 'quantity', 'image', 'primaryImage'].includes(k))
                        .map(([k, v]) => (typeof v === 'object' ? null : `${k}: ${v}`))
                        .filter(Boolean).join(', ');
                }
            }

            const name = variantString ? `${baseName} (${variantString})` : baseName;
            const qty = safeNum(item.quantity) || 1;
            const itemGstRate = safeNum(item.gstRate || 5);
            
            // Extract item level pricing if available in orderData.invoice, otherwise calculate
            // For now, let's assume we want to match the summary logic
            const mrp = safeNum(item.price || item.unitPrice || item.productDetails?.price);
            const basePriceUnit = Math.round((mrp / (1 + (itemGstRate / 100))) * 100) / 100;
            const basePriceTotal = basePriceUnit * qty;
            
            // Proportional discount distribution fallback
            const totalOrderDiscount = safeNum(pricing.discount || 0);
            const totalOrderBasePrice = items.reduce((sum, it) => {
                const itGst = safeNum(it.gstRate || 5) / 100;
                const itMrp = safeNum(it.price || it.unitPrice || it.productDetails?.price);
                return sum + (Math.round((itMrp / (1 + itGst)) * 100) / 100) * (safeNum(it.quantity) || 1);
            }, 0) || 1;

            const itemSpecificPricing = (pricing.itemsPricing || []).find(p => String(p.productId) === String(item.productId));
            
            let discount = 0;
            if (itemSpecificPricing && itemSpecificPricing.discount > 0) {
                discount = itemSpecificPricing.discount;
            } else if (totalOrderDiscount > 0) {
                discount = Math.round((basePriceTotal / totalOrderBasePrice) * totalOrderDiscount * 100) / 100;
            }

            const taxableValue = Math.round((basePriceTotal - discount) * 100) / 100;
            const gstTotal = taxableValue * (itemGstRate / 100);
            const cgst = Math.round((gstTotal / 2) * 100) / 100;
            const sgst = Math.round((gstTotal - cgst) * 100) / 100;
            const totalAmount = Math.round((taxableValue + gstTotal) * 100) / 100;

            tableBody.push([
                slNo++,
                name,
                qty,
                formatPrice(basePriceUnit),
                formatPrice(discount),
                formatPrice(taxableValue),
                `${itemGstRate}%`,
                formatPrice(cgst),
                formatPrice(sgst),
                formatPrice(totalAmount)
            ]);
        });
    }

    const deliveryCharge = safeNum(pricing.delivery || pricing.deliveryCharge || 0);
    const codCharge = safeNum(pricing.codCharge || 0);

    if (deliveryCharge > 0) {
        tableBody.push(['', 'Delivery Charge', '', '', '', '', '', '', '', formatPrice(deliveryCharge)]);
    }
    if (codCharge > 0) {
        tableBody.push(['', 'COD Charge', '', '', '', '', '', '', '', formatPrice(codCharge)]);
    }

    const grandTotal = safeNum(order.pricing?.finalTotal || order.pricing?.total || order.payment?.amount || 0);
    tableBody.push([
        { content: 'TOTAL', colSpan: 9, styles: { halign: 'right', fontStyle: 'bold', fillColor: [249, 249, 249] } },
        { content: Math.round(grandTotal || 0).toLocaleString(), styles: { halign: 'right', fontStyle: 'bold', fillColor: [249, 249, 249] } }
    ]);

    const amountInWordsStr = numberToWords(grandTotal);
    tableBody.push([
        { content: `Amount In Words : ${amountInWordsStr}`, colSpan: 10, styles: { halign: 'center', fontStyle: 'italic', fillColor: [240, 240, 240] } }
    ]);

    autoTable(doc, {
        startY: currentY,
        head: [['SL NO', 'Product Name', 'Qty', 'Unit Price', 'Discount', 'Taxable Value', 'Tax Rate', 'CGST', 'SGST', 'Total Amount']],
        body: tableBody,
        theme: 'grid',
        headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontSize: 9, fontStyle: 'bold', halign: 'center' },
        bodyStyles: { fontSize: 9, halign: 'center', valign: 'middle' },
        columnStyles: { 
            1: { halign: 'left', cellWidth: 120 },
            9: { halign: 'right' } 
        },
        margin: { left: startX, right: 45 },
    });

    currentY = (doc.lastAutoTable?.finalY || currentY + 100) + 20;
    const pageHeight = doc.internal.pageSize.getHeight();
    if (currentY + 50 > pageHeight) {
        doc.addPage();
        currentY = 40;
    }
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text('This is a computer-generated invoice. No signature required.', startX, currentY);

    if (returnBlob) {
        return doc.output('blob');
    } else {
        doc.save(`${invoicePrefix}.pdf`);
    }
};
