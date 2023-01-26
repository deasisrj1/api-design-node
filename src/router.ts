import {Router} from 'express';
import { body, oneOf, validationResult } from 'express-validator'
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from './handlers/product';
import { createAnUpdate, deleteAnUpdate, getAllUpdates, getOneUpdate, updateAnUpdated } from './handlers/update';
import { handleInputErrors } from './modules/middleware';

const router = Router();

/**
 *  Product
 */


router.get('/product', getProducts)
router.get('/product/:id', getOneProduct)
router.put(
    '/product/:id', 
    body('name').isString(),
    handleInputErrors,
    updateProduct
)
router.post(
    '/product',
    body('name').isString(),
    handleInputErrors,
    createProduct
)
router.delete('/product/:id', deleteProduct)

/**
 *  Update
 */

 router.get('/update', getAllUpdates)
 router.get('/update/:id', getOneUpdate)
 router.put(
    '/update/:id', 
    body('body').optional(),
    body('title').optional(),
    body('status').isIn(['IN_PROGRESS','SHIPPED','DEPRECATED']).optional(),
    body('version').optional(),
    handleInputErrors,
    updateAnUpdated)
 router.post(
    '/update/', 
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    handleInputErrors,
    createAnUpdate)
    
 router.delete('/update/:id', deleteAnUpdate)

 /**
  * Update Point
  */

 /**
 *  Product
 */

router.get('/updatepoint', () => {})
router.get('/updatepoint/:id', () => {})
router.put(
    '/updatepoint/:id',
    body('name').optional().isString(),
    body('description').optional().isString(),
    handleInputErrors,
    (req, res) => {
       
    })
router.post(
    '/updatepoint/', 
    body('name').exists().isString(),
    body('description').exists().isString(),
    body('updateId').exists().isString(),
    handleInputErrors,
    (req, res) => {

    })
router.delete('/updatepoint/:id', () => {})

export default router; 