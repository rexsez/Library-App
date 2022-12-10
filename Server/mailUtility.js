import axios from "axios";

export async function sendMail(recipient_email, subject, name, message, token) {
  axios
    .post("http://192.168.100.7:5000/send_email", {
      recipient_email,
      subject,
      name,
      message,
      token,
    })
    .then(() => console.log("Message Send Successfuly"))
    .catch(() => console.log("Didn't work"));
  return;
}
