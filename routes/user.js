
// Get All
router.get('/', async (req, res) => {
    try {
        const task = await Task.find()
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// Create One
router.post('/church', async (req, res) => {
    const data = req.body;
    const task = new Task(data);
    try {
        const taskMaster = await task.save();
        res.status(201).json(taskMaster);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get One
router.get('/church/:task_id', getFollower, (req, res) => {
    res.send(res.follower)
    
});

// Updating One
router.patch('/church/:task_id', getFollower, async (req, res) => {
    if (req.body.name != null) {
        res.follower.name = req.body.name
    }
    if (req.body.religion != null) {
        res.follower.religion = req.body.religion
    }
    try {
        const updatedFollower = await res.follower.save()
        res.json(updatedFollower)
    } catch (err) {
        err.status(400).json({ message: err.message })
    }
})

// Deleting One
router.delete('/church/:task_id', getFollower, async (req, res) => {
    try {
        await res.follower.remove()
        res.json({ message: "Follower descended." })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


async function getFollower(req, res, next) {
    let follower
    try {
        follower = await Task.findById(req.params.task_id)
        if (follower == null) {
            return res.status(404).json({ message: "Can't find the Follower" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.follower = follower
    next()
}

module.exports = router