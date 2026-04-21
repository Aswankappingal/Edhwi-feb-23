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
    const maxAddressWidth = 210; // pt - ensures it doesn't overlap with Left Column

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
    
    // Render wrapped address lines for Billing
    bLines.forEach(line => {
        const splitLines = doc.splitTextToSize(line, maxAddressWidth);
        splitLines.forEach(l => {
            rightY += 15;
            doc.text(l, 550, rightY, { align: 'right' });
        });
    });

    rightY += 30;

    doc.setFont('helvetica', 'bold');
    doc.text('Shipping Address :', 550, rightY, { align: 'right' });
    doc.setFont('helvetica', 'normal');

    rightY += 15;
    doc.text(billingName, 550, rightY, { align: 'right' });

    // Render wrapped address lines for Shipping
    bLines.forEach(line => {
        const splitLines = doc.splitTextToSize(line, maxAddressWidth);
        splitLines.forEach(l => {
            rightY += 15;
            doc.text(l, 550, rightY, { align: 'right' });
        });
    });

    currentY = Math.max(currentY + 40, rightY + 40);

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

    // --- Dynamic Place of Supply logic ---
    const userState = billingAdrs.state || 'Kerala';
    doc.text(`Place of supply : ${userState}`, leftColX, currentY);
    doc.text(`Place of Delivery : ${userState}`, leftColX, currentY + 15);

    // State Code Mapping
    const indianStateCodes = {
        'jammu': '01', 'himachal': '02', 'punjab': '03', 'chandigarh': '04', 'uttarakhand': '05',
        'haryana': '06', 'delhi': '07', 'rajasthan': '08', 'uttar pradesh': '09', 'bihar': '10',
        'sikkim': '11', 'arunachal': '12', 'nagaland': '13', 'manipur': '14', 'mizoram': '15',
        'tripura': '16', 'meghalaya': '17', 'assam': '18', 'west bengal': '19', 'jharkhand': '20',
        'odisha': '21', 'chhattisgarh': '22', 'madhya pradesh': '23', 'gujarat': '24', 'daman': '25',
        'dadra': '26', 'maharashtra': '27', 'andhra pradesh': '28', 'karnataka': '29', 'goa': '30',
        'lakshadweep': '31', 'kerala': '32', 'tamil nadu': '33', 'puducherry': '34', 'andaman': '35',
        'telangana': '36', 'ladakh': '37'
    };

    const stateInput = userState.toLowerCase();
    let stateCode = '32'; // Default to Kerala
    Object.keys(indianStateCodes).forEach(s => {
        if (stateInput.includes(s)) stateCode = indianStateCodes[s];
    });

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
            
            // Item Specific Pricing from Order Record
            const itemSpecificPricing = (pricing.itemsPricing || []).find(p => String(p.productId) === String(item.productId));
            
            const name = item.name || baseName; // Backend already formats this as Product (Variant)
            const qty = safeNum(item.quantity) || 1;
            const itemGstRate = safeNum(item.gstRate || 5);
            
            // Use stored values if available, otherwise fallback to calculation
            let unitPrice = 0;
            let discount = 0;
            let taxableValue = 0;
            let cgst = 0;
            let sgst = 0;
            let totalAmount = 0;

            if (itemSpecificPricing) {
                unitPrice = safeNum(itemSpecificPricing.basePrice) / qty;
                discount = safeNum(itemSpecificPricing.discount);
                taxableValue = safeNum(itemSpecificPricing.taxableValue);
                cgst = safeNum(itemSpecificPricing.cgst);
                sgst = safeNum(itemSpecificPricing.sgst);
                totalAmount = safeNum(itemSpecificPricing.total);
            } else {
                // Fallback Calculation
                const mrp = safeNum(item.price || item.unitPrice || item.productDetails?.price);
                const basePriceUnit = Math.round((mrp / (1 + (itemGstRate / 100))) * 100) / 100;
                const basePriceTotal = basePriceUnit * qty;
                
                const totalOrderDiscount = safeNum(pricing.discount || 0);
                const totalOrderBasePrice = items.reduce((sum, it) => {
                    const itGst = safeNum(it.gstRate || 5) / 100;
                    const itMrp = safeNum(it.price || it.unitPrice || it.productDetails?.price);
                    return sum + (Math.round((itMrp / (1 + itGst)) * 100) / 100) * (safeNum(it.quantity) || 1);
                }, 0) || 1;

                discount = Math.round((basePriceTotal / totalOrderBasePrice) * totalOrderDiscount * 100) / 100;
                taxableValue = Math.round((basePriceTotal - discount) * 100) / 100;
                const gstTotal = taxableValue * (itemGstRate / 100);
                cgst = Math.round((gstTotal / 2) * 100) / 100;
                sgst = Math.round((gstTotal - cgst) * 100) / 100;
                totalAmount = Math.round((taxableValue + gstTotal) * 100) / 100;
                unitPrice = basePriceUnit;
            }

            tableBody.push([
                slNo++,
                name,
                qty,
                formatPrice(unitPrice),
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
