module.exports = function(req,res,next) {
    const {session} = req;
    console.log(req.session, 'middleware')
        if (!session.user) {
            session.user = {
                username: '',
                cart: [],
                total: 0
        }
    }
    next()
}