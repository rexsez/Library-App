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
    .then(() => alert("Message Send Successfuly"))
    .catch(() => alert("Didn't work :("));
  return;
}
