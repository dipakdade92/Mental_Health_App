const Log = require('../models/Log');
const User = require('../models/User');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io=require('socket.io')(server)


exports.createLog = async (req, res) => {
  const { moodRating, anxietyLevel, sleepHours, sleepQuality, physicalActivity, socialInteraction, stressLevel, depressionSymptoms } = req.body;
  const userId = req.body.userId; 

  try {
    const newLog = await Log.create({
      moodRating,
      anxietyLevel,
      sleepHours,
      sleepQuality,
      physicalActivity,
      socialInteraction,
      stressLevel,
      depressionSymptoms,
      userId,
    });

    res.status(201).json({ message: 'Log submitted successfully', log: newLog });
  } catch (err) {
    console.error('Error creating log:', err);
    res.status(500).json({ error: 'Failed to create log', details: err.message });
  }
};


exports.getLogs = async (req, res) => {
  const userId = req.query.userId; 

  try {
    const logs = await Log.findAll({ where: { userId } });
    io.emit('new-logs', logs)

    res.status(200).json({ message: 'Logs retrieved successfully', logs });
  } catch (err) {
    console.error('Error retrieving logs:', err);
    res.status(500).json({ error: 'Failed to retrieve logs', details: err.message });
  }
};
