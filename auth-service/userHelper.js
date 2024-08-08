const express = require('express');
const userModel = require('./user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.createUser = async (req, res) => {
    try {
        const { name, password, email } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists', status: 'FAILED' })
        }
        // hash password
        const hashedPassword = await bcryptjs.hash(password, 10);

        await userModel.create({
            name,
            password: hashedPassword,
            email,
        })
        return res.status(201).json({ message: 'user created successfully', status: 'SUCCESS' })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err?.message, status: 'FAILED' })
    }
}

exports.loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if(!user){
            return res.status(404).json({ message: 'User not found', status: 'FAILED' })
        }
        // compare password
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({ message: 'Invalid password', status: 'FAILED' })
        }

        // generate token
        const token = jwt.sign({ userId: user._id ,id:user?._id, name:user?.name , email:user?.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: 'Login successful', status: 'SUCCESS', token });
    }catch(err){
        console.log(err);
        return res.status(500).json({ message: err?.message, status: 'FAILED' })
    }
}
   