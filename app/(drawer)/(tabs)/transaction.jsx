import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, Linking } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionsByUserId } from "../../../redux/features/transactionSlice";

export default function Transaction() {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transaction.data);
  const currentPage = useSelector((state) => state.transaction.currentPage);
  const totalPages = useSelector((state) => state.transaction.totalPages);
  const hasNext = useSelector((state) => state.transaction.hasNext);
  const hasPrevious = useSelector((state) => state.transaction.hasPrevious);
  const loading = useSelector((state) => state.transaction.loading);
  const user = useSelector((state) => state.user.data);
  const [redirectUrls, setRedirectUrls] = useState([]);
  const [tokens, setTokens] = useState({});

  useEffect(() => {
    dispatch(fetchTransactionsByUserId({ userId: user.id, page: 1 }));
  }, [dispatch, user.id]);

  useEffect(() => {
    if (transactions.length > 0) {
      const urls = {};
      const tokensMap = {}; // Objek untuk menyimpan tokens

      transactions.forEach((trx) => {
        if (trx.payment.redirectUrl) {
          urls[trx.id] = trx.payment.redirectUrl;
        }
        if (trx.payment.token) {
          tokensMap[trx.id] = trx.payment.token; // Simpan token berdasarkan ID transaksi
        }
      });

      setRedirectUrls(urls);
      setTokens(tokensMap); // Simpan tokens dalam state
    }
  }, [transactions]);

  const handlePayment = (transactionId) => {
    try {
      const token = tokens[transactionId]; // Ambil token berdasarkan ID transaksi
      if (!token) {
        throw new Error("Error getting token!");
      }

      const redirectUrl = redirectUrls[transactionId];
      if (redirectUrl) {
        Linking.openURL(redirectUrl)
          .catch((err) => {
            console.error("Failed to open URL:", err);
            Alert.alert("Error", "Failed to open URL!");
          });
      } else {
        Alert.alert("Error", "Redirect URL not found!");
        return;
      }

      Alert.alert("Success", "Payment successful!");
    } catch (error) {
      console.error("Cannot pay for the selected transaction!", error);
      Alert.alert("Error", "Cannot pay for the selected transaction!");
    }
  };

  const handleNextPage = () => {
    if (hasNext && !loading) {
      dispatch(fetchTransactionsByUserId({ userId: user.id, page: currentPage + 1 }));
    }
  };

  const handlePreviousPage = () => {
    if (hasPrevious && !loading) {
      dispatch(fetchTransactionsByUserId({ userId: user.id, page: currentPage - 1 }));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Transaction History</Text>
      {transactions.length > 0 ? (
        transactions.map((trx) => (
          <View key={trx.id} style={styles.transactionCard}>
            <Text style={styles.transactionId}>ID: {trx.id}</Text>
            <Text style={styles.transactionDate}>
              Transaction Date: {new Date(trx.transactionDate).toLocaleDateString()}
            </Text>
            <Text
              style={[
                styles.paymentStatus,
                {
                  backgroundColor: trx.payment.transactionStatus === "paid" ? "green" : "red",
                },
              ]}
            >
              {trx.payment.transactionStatus.toUpperCase()}
            </Text>
            <Text style={styles.address}>
              Delivery Address: {`${trx.address.detail}, ${trx.address.city}, ${trx.address.state}, ${trx.address.country} ${trx.address.postalCode}`}
            </Text>
            {trx.transactionDetails.map((trxDetail) => (
              <View key={trxDetail.invoice} style={styles.detailCard}>
                <Text style={styles.invoice}>Invoice: {trxDetail.invoice}</Text>
                <Text style={styles.productName}>{trxDetail.product.name}</Text>
                <Text style={styles.seller}>Seller: {trxDetail.product.user.displayName}</Text>
                <Text style={styles.quantity}>
                  Quantity: {trxDetail.quantity} x Rp{trxDetail.product.price.toLocaleString()}
                </Text>
                <Text style={styles.totalPrice}>
                  Total Price: Rp{(trxDetail.quantity * trxDetail.product.price).toLocaleString()}
                </Text>
                {trx.payment.transactionStatus !== "paid" && (
                  <TouchableOpacity
                    style={styles.payButton}
                    onPress={() => handlePayment(trx.id)}
                  >
                    <Text style={styles.payButtonText}>Pay Now</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Nothing to show here...</Text>
          <Text style={styles.emptyText}>
            Looks like you didn't buy anything from Oeuvre... yet. You can order something from our great sellers!
          </Text>
          <Text style={styles.emptyText}>
            Or perhaps, maybe you got something to do...
          </Text>
        </View>
      )}

      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[styles.pageButton, { backgroundColor: "#ccc" }]}
          onPress={handlePreviousPage}
          disabled={loading || !hasPrevious}
        >
          <Text style={styles.pageButtonText}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.pageInfo}>Page {currentPage} of {totalPages}</Text>
        <TouchableOpacity
          style={[styles.pageButton, { backgroundColor: "#4f6d7a" }]}
          onPress={handleNextPage}
          disabled={loading || !hasNext}
        >
          <Text style={styles.pageButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 5,
  },
  transactionCard: {
    borderColor: "#dcdcdc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
  },
  transactionId: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  transactionDate: {
    fontSize: 14,
    marginBottom: 8,
  },
  paymentStatus: {
    fontSize: 14,
    color: "#fff",
    padding: 4,
    textAlign: "center",
    borderRadius: 4,
    marginBottom: 8,
  },
  address: {
    fontSize: 14,
    marginBottom: 8,
  },
  detailCard: {
    borderColor: "#dcdcdc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#ffffff",
  },
  invoice: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  productName: {
    fontSize: 14,
    marginBottom: 4,
  },
  seller: {
    fontSize: 14,
    marginBottom: 4,
  },
  quantity: {
    fontSize: 14,
    marginBottom: 4,
  },
  totalPrice: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  payButton: {
    backgroundColor: "#4f6d7a",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  payButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  pageButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  pageButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  pageInfo: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
});
