const usertable = require("../../Models/user.js");
//const sendEmail = require("../../middlewares/emailconfig.js");

const user_creation = async (req, res) => {
  try {
    const {title, description,quantity,pricing,status } = req.body;    
    const createuser = new usertable({ title, description, quantity,pricing,status });

    const response = await createuser.save();
    //sendEmail(email,"Email in Mern stack",`Hello ${title} its just a Testing Message`)
    res.send({ status: "successfull", data: response });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.description) {
      return res.json({ status: "failed", errors: { description: `Description already exists` } });
    } else if (error.code === 11000 && error.keyPattern.quantity) {
      return res.json({ status: "failed", errors: { quantity: `Quantity already exists` } });
    } else {
      console.error("Failed to create user:", error);
      res.status(500).json({ status: "failed", errors: ["Internal server error"] });
    }
  }
};

module.exports = user_creation;
