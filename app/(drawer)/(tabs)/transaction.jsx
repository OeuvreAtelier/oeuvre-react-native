import React, { useEffect } from "react"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux"
import { fetchTransactionsByUserId } from "../../../redux/features/transactionSlice"

export default function Transaction({ artist }) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const transactions = useSelector((state) => state.transaction.data)
  const user = useSelector((state) => state.user.data)

  console.log("trans", transactions)

  useEffect(() => {
    dispatch(fetchTransactionsByUserId(user.id))
  }, [dispatch, user.id])

  console.log(user.id)

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
    })

    return unsubscribe
  }, [navigation])

  const handlePayment = (selectedToken) => {
    try {
      const token = selectedToken
      if (!token) {
        throw new Error("Error getting token!")
      }
      Alert.alert("Success", "Payment successful!")
      navigation.navigate("Success")
    } catch (error) {
      console.error("Cannot pay for the selected transaction!", error)
      Alert.alert("Error", "Cannot pay for the selected transaction!")
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Transaction History</Text>
      {transactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Nothing to show here...</Text>
          <Text style={styles.emptyText}>
            Looks like you didn't buy anything from Oeuvre... yet. You can order something from our great sellers!
          </Text>
          <Text style={styles.emptyText}>
            Or perhaps, maybe you got something to do...
          </Text>
        </View>
      ) : (
        transactions.map((trx) => (
          <View key={trx.id} style={styles.transactionCard}>
            <Text style={styles.transactionId}>ID: {trx.id}</Text>
            <Text style={styles.transactionDate}>Transaction Date: {new Date(trx.transactionDate).toLocaleDateString()}</Text>
            <Text style={[styles.paymentStatus,{backgroundColor: trx.payment.transactionStatus === "paid" ? "green" : "red",
    },
  ]}
>
  {trx.payment.transactionStatus.toUpperCase()}
</Text>

            <Text style={styles.address}>Delivery Address: {`${trx.address.detail}, ${trx.address.city}, ${trx.address.state}, ${trx.address.country} ${trx.address.postalCode}`}</Text>
            {trx.transactionDetails.map((trxDetail) => (
              <View key={trxDetail.invoice} style={styles.detailCard}>
                <Text style={styles.invoice}>Invoice: {trxDetail.invoice}</Text>
                <Text style={styles.productName}>{trxDetail.product.name}</Text>
                <Text style={styles.seller}>Seller: {trxDetail.product.user.displayName}</Text>
                <Text style={styles.quantity}>Quantity: {trxDetail.quantity} x Rp{trxDetail.product.price.toLocaleString()}</Text>
                <Text style={styles.totalPrice}>
                  Total Price: Rp{(trxDetail.quantity * trxDetail.product.price).toLocaleString()}
                </Text>
                {trx.payment.transactionStatus !== "paid" && (
                  <TouchableOpacity
                    style={styles.payButton}
                    onPress={() => handlePayment(trx.payment.token)}
                  >
                    <Text style={styles.payButtonText}>Pay Now</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        ))
      )}
    </ScrollView>
  )
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
})
