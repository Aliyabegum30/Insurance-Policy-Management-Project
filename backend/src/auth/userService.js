const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');

const { v4: uuidv4 } = require('uuid');

class UserService {
  constructor() {
    this.adapter = new JSONFile('data/users.json');

    // Default structure
    this.db = new Low(this.adapter, {
      users: []
    });
  }

  // Initialize database
  async initialize() {
    await this.db.read();

    this.db.data ||= {
      users: []
    };

    await this.db.write();
  }

  // Generate JWT
  generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || 'your-super-secret-jwt-key',
      {
        expiresIn: '7d'
      }
    );
  }

  // Register User
  async register(email, password, name) {
    await this.db.read();

    // Check existing user
    const existingUser = this.db.data.users.find(
      (u) => u.email === email
    );

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      role: 'user',
      createdAt: new Date().toISOString()
    };

    // Save user
    this.db.data.users.push(user);

    await this.db.write();

    // Generate token
    const token = this.generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }

  // Login User
  async login(email, password) {
    await this.db.read();

    // Find user
    const user = this.db.data.users.find(
      (u) => u.email === email
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = this.generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }

  // Find user by ID
  async findById(id) {
    await this.db.read();

    return this.db.data.users.find(
      (u) => u.id === id
    );
  }

  // Get all users
  async getAllUsers() {
    await this.db.read();

    return this.db.data.users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    }));
  }
}

module.exports = new UserService();