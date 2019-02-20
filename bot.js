var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

var serverID = '541822804727955470';

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
  colorize: true
});

logger.level = 'debug';

// Initialize Discord bot
var bot = new Discord.Client({
  token:auth.token,
  autorun:true
});

bot.on('ready', function (evt) {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + '-(' + bot.id + ')');
  
  
  
});

bot.on('message', function (user, userID, channelID, message, evt) {
  // Our bot needs to know if it will execute a command
  // It will listen for messages that will start with '!'
  if (message.substring(0, 1) == '!') {
    var args = message.substring(1).split(' ');
    var cmd = args[0];

    args = args.splice(1);
    switch(cmd) {
      // !ping
      case 'marco':
        bot.sendMessage({
          to:channelID,
          message:'Polo!'
        });
        break;
      default:
        break;
    }
  }
});

/**
 * Listens for the !addGroup command and adds the sender of the message
 * to the role they specified.
 * FUTURE: Will be updated to work with JSON data.
 * */
bot.on('message', function (user, userID, channelID, message, evt) {
  
  if (message.toLowerCase().startsWith("!addgroup") || message.toLowerCase().startsWith("!removegroup")) {
      let toAdd = message.split(" ");
      
      var group;
      
      switch (toAdd[1].toLowerCase()) {
        case 'central-campus':
          group = 'Central Campus CG';
          break;
        case 'franz-and-north':
          group = 'Franz / North CG';
          break;
        case 'charger-village':
          group = 'Charger Village CG';
          break;
        case 'southeast':
          group = 'Southeast CG';
          break;
        case 'international-grad':
          group = 'Int. Students - Grad';
          break;
        case 'international-undergrad':
          group = 'Int. Students - Undergrad';
          break;
        case 'married-students':
          group = 'Married/Engaged CG';
          break;
        case 'minority-students':
          group = 'Minority Students CG';
          break;
        case 'off-campus':
          group = 'Off Campus CG';
          break;
        case 'commuters-lunch':
          group = 'Commuters Lunch CG';
          break;
        case 'gamer':
          group = 'Gamer';
          break;
        default:
          group = 'ERROR';
          break;
      }
      
      if (group === 'ERROR') {
        bot.sendMessage({
          to:channelID,
          message:"The group name you entered is not valid." +
                  " For help, see the welcome message.",
        });
      }
      var roles = bot.servers[serverID].roles;
          
        for (var r in roles) {
          if (roles[r].name === group) {
            
            if (message.toLowerCase().startsWith("!addgroup")) {
            
              bot.addToRole({
                serverID: serverID,
                userID: userID,
                roleID: roles[r].id,
              });
          
              bot.sendMessage({
                to:channelID,
                message:"You've been added to " + roles[r].name + "!",
              });
              
            } else if (message.toLowerCase().startsWith("!removegroup")) {
            
              bot.removeFromRole({
                serverID: serverID,
                userID: userID,
                roleID: roles[r].id,
              });
            
              bot.sendMessage({
                to:channelID,
                message:"You've been removed from " + roles[r].name + "!",
              });
            
            }
            
            break;
          }
        }
      
  }
  
});
