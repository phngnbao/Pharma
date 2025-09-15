import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define styles for the PDF
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 40,
        fontSize: 10,
        fontFamily: 'Helvetica',
    },
    header: {
        marginBottom: 20,
        borderBottom: '2 solid #3B82F6',
        paddingBottom: 10,
    },
    title: {
        fontSize: 24,
        marginBottom: 5,
        color: '#1F2937',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 12,
        color: '#6B7280',
    },
    invoiceInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    invoiceNumber: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    customerInfo: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#1F2937',
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    infoLabel: {
        fontWeight: 'bold',
        width: 80,
        color: '#4B5563',
    },
    infoValue: {
        color: '#1F2937',
    },
    table: {
        marginBottom: 20,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#F3F4F6',
        padding: 8,
        borderBottom: '1 solid #D1D5DB',
    },
    tableRow: {
        flexDirection: 'row',
        padding: 8,
        borderBottom: '0.5 solid #E5E7EB',
    },
    tableCell: {
        fontSize: 9,
        color: '#1F2937',
    },
    tableCellHeader: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    itemName: {
        width: '30%',
    },
    itemCompany: {
        width: '20%',
    },
    itemQty: {
        width: '15%',
        textAlign: 'center',
    },
    itemPrice: {
        width: '15%',
        textAlign: 'right',
    },
    itemTotal: {
        width: '20%',
        textAlign: 'right',
    },
    summary: {
        marginTop: 20,
        alignItems: 'flex-end',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 200,
        marginBottom: 5,
    },
    summaryLabel: {
        fontSize: 10,
        color: '#4B5563',
    },
    summaryValue: {
        fontSize: 10,
        color: '#1F2937',
    },
    summaryTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 200,
        marginTop: 10,
        paddingTop: 10,
        borderTop: '1 solid #D1D5DB',
    },
    summaryTotalLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    summaryTotalValue: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    footer: {
        marginTop: 30,
        paddingTop: 20,
        borderTop: '1 solid #E5E7EB',
        textAlign: 'center',
    },
    footerText: {
        fontSize: 9,
        color: '#6B7280',
        marginBottom: 5,
    },
    statusPaid: {
        color: '#10B981',
        fontWeight: 'bold',
    },
    discount: {
        color: '#10B981',
        fontSize: 8,
    },
});

const InvoicePDF = ({ paymentData }) => {
    // Calculate subtotal, tax, and shipping
    const calculateSubtotal = () => {
        return paymentData.items.reduce((total, item) => {
            const itemPrice = item.discount > 0
                ? item.pricePerUnit - (item.pricePerUnit * item.discount / 100)
                : item.pricePerUnit;
            return total + (itemPrice * item.quantity);
        }, 0);
    };

    const subtotal = calculateSubtotal();
    const tax = subtotal * 0.08;
    const shipping = subtotal >= 50 ? 0 : 5.99;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>MediCare Pharmacy</Text>
                    <Text style={styles.subtitle}>Your trusted healthcare partner</Text>
                </View>

                {/* Invoice Information */}
                <View style={styles.invoiceInfo}>
                    <View>
                        <Text style={styles.sectionTitle}>Invoice</Text>
                        <Text style={styles.invoiceNumber}>#{paymentData.id}</Text>
                        <Text style={styles.infoValue}>
                            Date: {new Date(paymentData.created).toLocaleDateString()}
                        </Text>
                        <Text style={[styles.infoValue, styles.statusPaid]}>
                            Status: PAID
                        </Text>
                    </View>
                </View>

                {/* Customer Information */}
                <View style={styles.customerInfo}>
                    <Text style={styles.sectionTitle}>Bill To:</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Name:</Text>
                        <Text style={styles.infoValue}>{paymentData.customer.fullName}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Email:</Text>
                        <Text style={styles.infoValue}>{paymentData.customer.email}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Phone:</Text>
                        <Text style={styles.infoValue}>{paymentData.customer.phone}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Address:</Text>
                        <Text style={styles.infoValue}>
                            {paymentData.customer.address}, {paymentData.customer.city}, {paymentData.customer.state} {paymentData.customer.zipCode}
                        </Text>
                    </View>
                </View>

                {/* Payment Information */}
                <View style={styles.customerInfo}>
                    <Text style={styles.sectionTitle}>Payment Information:</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Method:</Text>
                        <Text style={styles.infoValue}>
                            {paymentData.paymentMethod.type.toUpperCase()} ending in {paymentData.paymentMethod.last4}
                        </Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Transaction:</Text>
                        <Text style={styles.infoValue}>{paymentData.id}</Text>
                    </View>
                </View>

                {/* Items Table */}
                <View style={styles.table}>
                    <Text style={styles.sectionTitle}>Order Items</Text>

                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableCellHeader, styles.itemName]}>Item</Text>
                        <Text style={[styles.tableCellHeader, styles.itemCompany]}>Company</Text>
                        <Text style={[styles.tableCellHeader, styles.itemQty]}>Qty</Text>
                        <Text style={[styles.tableCellHeader, styles.itemPrice]}>Price</Text>
                        <Text style={[styles.tableCellHeader, styles.itemTotal]}>Total</Text>
                    </View>

                    {/* Table Rows */}
                    {paymentData.items.map((item, index) => {
                        const itemPrice = item.discount > 0
                            ? item.pricePerUnit - (item.pricePerUnit * item.discount / 100)
                            : item.pricePerUnit;
                        const itemTotal = itemPrice * item.quantity;

                        return (
                            <View key={index} style={styles.tableRow}>
                                <View style={styles.itemName}>
                                    <Text style={styles.tableCell}>{item.name}</Text>
                                    <Text style={[styles.tableCell, { fontSize: 8, color: '#6B7280' }]}>
                                        {item.genericName} • {item.massUnit}
                                    </Text>
                                </View>
                                <Text style={[styles.tableCell, styles.itemCompany]}>{item.company}</Text>
                                <Text style={[styles.tableCell, styles.itemQty]}>{item.quantity}</Text>
                                <View style={styles.itemPrice}>
                                    <Text style={styles.tableCell}>${itemPrice.toFixed(2)}</Text>
                                    {item.discount > 0 && (
                                        <Text style={styles.discount}>({item.discount}% off)</Text>
                                    )}
                                </View>
                                <Text style={[styles.tableCell, styles.itemTotal]}>${itemTotal.toFixed(2)}</Text>
                            </View>
                        );
                    })}
                </View>

                {/* Summary */}
                <View style={styles.summary}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotal:</Text>
                        <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Tax (8%):</Text>
                        <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Shipping:</Text>
                        <Text style={styles.summaryValue}>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</Text>
                    </View>
                    <View style={styles.summaryTotal}>
                        <Text style={styles.summaryTotalLabel}>Total:</Text>
                        <Text style={styles.summaryTotalValue}>${paymentData.amount.toFixed(2)}</Text>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Thank you for choosing MediCare Pharmacy!</Text>
                    <Text style={styles.footerText}>For support, contact us at support@medicare-pharmacy.com</Text>
                    <Text style={styles.footerText}>This is a computer-generated invoice and does not require a signature.</Text>
                </View>
            </Page>
        </Document>
    );
};

export default InvoicePDF;
