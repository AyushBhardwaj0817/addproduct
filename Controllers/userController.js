const { render } = require("ejs");
const Usertable = require("../Models/user");


exports.usersingle = async (req, res) => { 
    const userId = req.params.id;
    try {
      const userdetail = await user.findById(userId);
      if (!userdetail) {
        return res.status(404).send({ error: 'user detail not found' });
      }
  
      res.status(200).send({status:"successfully",data:userdetail});
    } catch (err) {
      res.status(500).send({ error: 'An error occurred while fetching userdetail ',servererror:err });
    }

  


}


exports.userlist = async (req, res) => { 
    try{
      const users = await Usertable.find().sort({ createdAt: -1 });
        res.send({status:"successfully 123",data:users})
    
    }catch(err){
        console.log(`  here is errror ${err}`);
        res.send({status:"faild",errors:err.errors})
    
    }
    
    
    }


exports.user_creation = async (req, res) => {
    try {
      const {title, description,quantity,pricing,status } = req.body;    
      const createuser = new Usertable({ title, description, quantity,pricing,status });
  
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

exports.deleteuser = async (req, res) => {
  try {
    const user = await Usertable.findByIdAndDelete(req.params.id);
    res.send({
      status: "successfully delete",
      data: user
    });
  } catch (err) {
    res
      .status(500)
      .send({ error: "An error occurred while deleting User" });
  }
};

exports.updateuser = async (req, res) => {
    const userId = req.params.id;
    try {
      const updatedUser = await Usertable.findByIdAndUpdate(userId, req.body, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ status: "failed", message: "User not found" });
      }
  
      res.json({ status: "successfully update", data: updatedUser });
    } catch (err) {
      console.error(`Error: ${err}`);
      res.status(500).json({ status: "failed", errors: err.message });
    }
};

exports.homePage = async(res, req) =>{
    return render('home');
}


