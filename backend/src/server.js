import app from './index.js'
import vragenlijstRoutes from './routes/vragenlijstRoutes.js'

// API Routes
app.use('/vragenlijst', vragenlijstRoutes)
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});