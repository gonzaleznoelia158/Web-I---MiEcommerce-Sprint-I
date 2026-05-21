function cartCont(req,res, next){
    let cartCont = 0;
    if(req.session.cart && Array.isArray(req.session.cart)){
        cartCont = req.session.cart.reduce((total, item) => total + item.quantity, 0);
    }
    res.locals.cartCont = cartCont;
    next();
}



module.exports = cartCont;