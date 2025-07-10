const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "your@gmail.com",
    pass: "your_app_password", // Enable 2FA and use App Password
  },
});

module.exports = async (email, order) => {
  const html = `
    <h2>Order Confirmation</h2>
    <p>Thank you for your order. Total: Rs. ${order.total}</p>
    <ul>
      ${order.items
        .map((item) => `<li>${item.productId.title} x ${item.quantity}</li>`)
        .join("")}
    </ul>
  `;

  await transporter.sendMail({
    to: email,
    from: "your@gmail.com",
    subject: "Your Order was Placed!",
    html,
  });
};
