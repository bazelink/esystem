const resetPassword = async (req, res) => {
    try {
      const newFields = {
        passwordRecoveryToken: null,
        tokenExpiry: null,
      };
  
      const updateFields = {};
      for (const [key, value] of Object.entries(newFields)) {
        updateFields[key] = { $ifNull: [$${key}, value] };
      }
  
      await User.updateMany(
        {
          $or: Object.keys(newFields).map((key) => ({ [key]: { $exists: false } })),
        },
        { $set: newFields }
      );
  
      console.log('New fields added to users that were missing them');
    } catch (error) {
      console.error('Error updating users:', error);
    }
    const { email, verificationCode, newPassword } = req.body;
    const user = await User.findOne({
      email,
      resetPasswordToken: verificationCode,
      resetPasswordExpires: { $gt: Date.now() },
    });
  
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification code' });
    }
  
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
  
    await user.save();
  
    res.status(200).json({ message: 'Password has been reset' });
  };