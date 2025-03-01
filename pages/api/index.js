export default function handler(req, res) {
    let waitingQueue = [];

    if (req.method === 'POST') {
        const { name, time, shower } = req.body;

        if (name && time && shower) {
            waitingQueue.push({ name, time, shower });
            return res.status(200).json({ message: 'User signed in successfully', waitingQueue });
        } else {
            return res.status(400).json({ message: 'Missing required fields' });
        }
    } else if (req.method === 'DELETE') {
        const { name } = req.body;

        if (waitingQueue.length > 0 && waitingQueue[0].name === name) {
            waitingQueue.shift();
            return res.status(200).json({ message: 'User signed out successfully', waitingQueue });
        } else {
            return res.status(400).json({ message: 'User not found in the waiting list' });
        }
    } else {
        res.setHeader('Allow', ['POST', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}