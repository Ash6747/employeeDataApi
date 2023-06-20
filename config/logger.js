const {
    createLogger,
    transports,
    format
}= require('winston');
require('winston-mongodb');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });

const logger = createLogger({
    format: combine(
        label({ label: 'employee logs!' }),
        timestamp(),
        myFormat
      ),
    transports:[
        new transports.File({
            filename:'info.log',
            maxsize:'1k',
            level: 'info',
            maxFiles:'30'
        }),
        new transports.MongoDB({
            level: 'error',
            db: 'mongodb+srv://ashishsatpute6747:syBeZUByEJnmdaOY@cluster0.jjkvnzv.mongodb.net/employee_logs?retryWrites=true&w=majority',
            options: { useUnifiedTopology: true },
            collection:'logs',
            format: format.combine(
                format.timestamp(),
                format.json(),
                myFormat
            )
        })
    ]
})

module.exports = logger;