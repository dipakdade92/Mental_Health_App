const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register a new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
};

// Login route
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Send the user details (including the id) as response
    res.status(200).json({
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};
