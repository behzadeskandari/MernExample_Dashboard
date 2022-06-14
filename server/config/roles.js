const AccessControl = require('accesscontrol');



let adminglobal = {
    'create:any': ['*'],
    'read:any': ['*'],
    'update:any': ['*'],
    'delete:any': ['*'],
}

let grantObject = {
    admin: {
        profile:adminglobal,
        
        articles:{
            'read:any': ['*'],
        },
        article:{
            'create:any': ['*'],
            'read:any':   ['*'],
            'update:any': ['*'],
            'delete:any': ['*'],
        },
    },
    user: {
        profile: {
            'read:own': ['*','!password','!_id','!date'],
            'update:own': ['*'],
        }
    }
};

const roles = new AccessControl(grantObject);

module.exports = { roles };