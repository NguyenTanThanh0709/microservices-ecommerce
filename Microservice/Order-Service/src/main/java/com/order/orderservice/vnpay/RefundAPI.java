package com.order.orderservice.vnpay;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.TimeZone;

import org.springframework.web.bind.annotation.PostMapping;

@RequestMapping("/api/v1/orders")
@RestController
public class RefundAPI {

    @PostMapping("/refund")
    public String refundPayment(
            @RequestParam("orderId") String orderId,
            @RequestParam("amountt") long amountt,
            @RequestParam("transDate") String transDate,
            @RequestParam("user") String user
    ) throws IOException {
        String vnp_RequestId = VNPayConfig.getRandomNumber(8);
        String vnp_Version = "2.1.0";
        String vnp_Command = "refund";
        String vnp_TmnCode = VNPayConfig.vnp_TmnCode;
        String vnp_TransactionType = "03";
        String vnp_TxnRef = orderId;
        long amount = (amountt)*100;
        String vnp_Amount = String.valueOf(amount);
        String vnp_OrderInfo = "Hoan tien GD OrderId:" + orderId;
        String vnp_TransactionNo = ""; // Assuming value of the parameter "vnp_TransactionNo" does not exist on your system.
        String vnp_TransactionDate = transDate;
        String vnp_CreateBy = user;
        String vnp_IpAddr = "127.0.0.1";

        JsonObject vnp_Params = new JsonObject();

        // Add properties to vnp_Params
        vnp_Params.addProperty("vnp_RequestId", vnp_RequestId);
        vnp_Params.addProperty("vnp_Version", vnp_Version);
        vnp_Params.addProperty("vnp_Command", vnp_Command);
        vnp_Params.addProperty("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.addProperty("vnp_TransactionType", vnp_TransactionType);
        vnp_Params.addProperty("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.addProperty("vnp_Amount", vnp_Amount);
        vnp_Params.addProperty("vnp_OrderInfo", vnp_OrderInfo);


        vnp_Params.addProperty("vnp_TransactionDate", vnp_TransactionDate);
        vnp_Params.addProperty("vnp_CreateBy", vnp_CreateBy);

        // Generate vnp_CreateDate and add it to vnp_Params
        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.addProperty("vnp_CreateDate", vnp_CreateDate);

        vnp_Params.addProperty("vnp_IpAddr", vnp_IpAddr);

        String hash_Data = String.join("|", vnp_RequestId, vnp_Version, vnp_Command, vnp_TmnCode,
                vnp_TransactionType, vnp_TxnRef, vnp_Amount, vnp_TransactionNo, vnp_TransactionDate,
                vnp_CreateBy, vnp_CreateDate, vnp_IpAddr, vnp_OrderInfo);

        String vnp_SecureHash = VNPayConfig.hmacSHA512(VNPayConfig.secretKey, hash_Data.toString());

        vnp_Params.addProperty("vnp_SecureHash", vnp_SecureHash);

        // Now, you should send the refund request to VNPay API using HttpURLConnection
        // and handle the response accordingly.
        URL url = new URL(VNPayConfig.vnp_ApiUrl);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json");
        con.setDoOutput(true);
        // Send the vnp_Params JSON object to the API
        try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
            wr.writeBytes(vnp_Params.toString());
            wr.flush();
        }

        // Handle the response from the VNPay API (responseCode and response data)
        int responseCode = con.getResponseCode();
        System.out.println("Sending 'POST' request to URL: " + url);
        System.out.println("Post Data: " + vnp_Params);
        System.out.println("Response Code: " + responseCode);

        try (BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()))) {
            String output;
            StringBuilder response = new StringBuilder();
            while ((output = in.readLine()) != null) {
                response.append(output);
            }
            System.out.println(response.toString());
            // Process the response from VNPay here

            JsonObject jsonResponse = new JsonParser().parse(response.toString()).getAsJsonObject();
            String resultCode = jsonResponse.get("vnp_ResponseCode").getAsString();

            if ("00".equals(resultCode)) {
                return "succsess";
            }else if("99".equals(resultCode)){
                System.out.println("Hoàn tiền thất bại");
                // Thực hiện các hành động sau khi hoàn tiền thất bại
                return "wait";
            }else {
                System.out.println("Hoàn tiền thất bại");
                // Thực hiện các hành động sau khi hoàn tiền thất bại
                return "fail";
            }
        }
    }
}
