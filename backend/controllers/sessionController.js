const getSessionInfo = (req, res) => {
  if (!req.isAuthenticated() || !req.session.user) {
    return res.status(401).json({ message: 'No autenticado' });
  }

  const { displayName, photos, name } = req.session.user;

  res.json({
    name: displayName || name?.givenName || 'Usuario',
    image: photos?.[0]?.value || null
  });
};


const getSessionInfoAndrokolis = (req, res) => {
  if (req.user) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });
  }
};

module.exports = {
  getSessionInfo,getSessionInfoAndrokolis,
};