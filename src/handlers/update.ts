import prisma from "../db";

// Get All Updates
export const getAllUpdates = async (req, res) => {
    // const user = await prisma.user.findUnique({
    //     where: {
    //         id: req.user.id
    //     },
    //     include: {
    //         products: {
    //             include: {
    //                 updates: true
    //             }
    //         }
    //     }

    // })

    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    const updates = await prisma.update.findMany({
        where: {
            product: {
                belongsToId: req.user.id
            }
        }
    })

    // const updates = products.reduce((allUpdates, product) => {
    //     return [...allUpdates, ...product.updates]
    // })
    res.json({data: updates })


}

// Get One Update
export const getOneUpdate = async (req, res) => {
    // let user = req.user.id

    // const update = await prisma.update.findFirst({
    //     where: {
    //         id,
    //         product: {
    //             belongsToId: user
    //         }
    //     }
    // })

    const update = await prisma.update.findUnique({
        where: {
            id: req.params.id
        }
    })
    res.json({data: update})
}

export const updateAnUpdated = async (req, res) => {

    // const update = await prisma.update.findFirst({
    //     where: {
    //         id: req.params.id,
    //         product: {
    //             belongsToId: req.user.id
    //         }
    //     }
    // })

    // const updated = await prisma.update.update({
    //     where: update,
    //     data: req.body
    // })

    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    const match = updates.find(update => update.id === req.params.id)

    if (!match) {
        res.json({message: 'nope'})
    }

    const updatedUpdate = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })

    res.json({data: updatedUpdate})
}

export const createAnUpdate = async (req, res) => {
    // const {productId, ...rest} = req.body;
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId
        }
    })

    if (!product) {
        // does not belong to user
        return res.json({message: 'nope'})
    }

    const update = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            product: { connect: {id: product.id }}
        }
    })

    res.json({data: update})
}

export const deleteAnUpdate = async (req, res) => {
    // const update = await prisma.update.findFirst({
    //     where: {
    //         id: req.params.id,
    //         product: {
    //             belongsToId: req.user.id
    //         }
    //     }
    // })

    // const deleted = await prisma.update.delete({
    //     where: update,
    // })
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    const match = updates.find(update => update.id === req.params.id)

    if (!match) {
        res.json({message: 'nope'})
    }

    const deleted = await prisma.update.delete({
        where: {
            id: req.params.id
        },
    })

    res.json({data: deleted})
}