import { Response } from 'express';
import { CustomRequest } from '../interfaces/request.interface';
import { ErrorResponse, SuccessResponse } from '../common/ApiResponse';
import { StatusCodes } from 'http-status-codes';
import { connectToDatabase } from '../utils/DatabaseUtils';
import { nameOf } from '../helpers/helper';
import { ProductEntity } from '../model/Tables/product.model';
import { ProductCategoryEntity } from '../model/Tables/productCategory.model';
import { OrdersEntity } from '../model/Tables/order.model';

export const insertProduct = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const productRepo = database.getRepository(ProductEntity);
    const returnProduct = await productRepo.upsert({
        ProductName: req.body.ProductName,
    }, {
        conflictPaths: [nameOf<ProductEntity>('ProductId')]
    });
    return new SuccessResponse(StatusCodes.OK, returnProduct, 'Added product name successfully!!').send(res);
};

export const insertProductCategory = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const productCatRepo = database.getRepository(ProductCategoryEntity);
    if(!req.body.ProductId) return new ErrorResponse(StatusCodes.NOT_FOUND, 'Please provide Product!!!');
    const returnProductCat = await productCatRepo.upsert({
        ProductCategory: req.body.ProductCategory,
        ProductId: req.body.ProductId
    }, {
        conflictPaths: [nameOf<ProductCategoryEntity>('ProductId'), nameOf<ProductCategoryEntity>('ProductCategory')]
    });
    return new SuccessResponse(StatusCodes.OK, returnProductCat, 'Added product category successfully!!').send(res);
};
export const getProducts = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const productRepo = database.getRepository(ProductEntity);
    const returnProduct = await productRepo.find({ relations: { product_category: true } });
    if (returnProduct) {
        return new SuccessResponse(StatusCodes.OK, returnProduct, 'Get product successfully!!').send(res);
    };
};

export const getProductCategoryByProductId = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const productCategoryRepo = database.getRepository(ProductCategoryEntity);
    if(!req.query.ProductId) return new ErrorResponse(StatusCodes.NOT_FOUND, 'Please provide productId!!');
    const returnProductCategory = await productCategoryRepo.find({ where: { ProductId: req.query.ProductId as any}, relations: { product_details: true }});
    if (returnProductCategory) {
        return new SuccessResponse(StatusCodes.OK, returnProductCategory, 'Get product category successfully!!').send(res);
    };
};

export const getProductById = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const productRepo = database.getRepository(ProductEntity);
    const returnProduct = await productRepo.findOne({ where: { ProductId: req.query.ProductId as any }, relations: { product_category: true }});
    if (returnProduct) {
      return new SuccessResponse(StatusCodes.OK, returnProduct, 'Get Product successfully!!').send(res);
  }};

export const updateProduct = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const productRepo = database.getRepository(ProductEntity);
    const returnProduct = await productRepo.findOne({ where: { ProductId: req.query.ProductId as any } })
    const updatedData = { ...returnProduct, ...req.body }
    const update = await productRepo.update(req.query.ProductId as any, updatedData);
    if (update) {
        return new SuccessResponse(StatusCodes.OK, updatedData, 'Updated product successfully!!').send(res);
    };
};

export const updateProductCategory = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const productCatRepo = database.getRepository(ProductCategoryEntity);
    const returnProductCat = await productCatRepo.findOne({ where: { ProductId: req.body.ProductId as any } })
    const update = await productCatRepo.update(req.query.ProductCategoryId as any,{...req.body});
    if (update) {
        return new SuccessResponse(StatusCodes.OK, {...req.body}, 'Updated product category successfully!!').send(res);
    };
}

export const deleteProduct = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const productRepo = database.getRepository(ProductEntity);
    const catRepo = database.getRepository(ProductCategoryEntity);
    const orderRepo = database.getRepository(OrdersEntity);
    if(req.query.ProductId){
        const findOrder = await orderRepo.find({ where: { ProductId: req.query.ProductId as any }});
        if(findOrder){
            for (const o of findOrder) { await o.remove() };
        }
        const findCat = await catRepo.find({ where: { ProductId: req.query.ProductId as any }});
        if(findCat) { 
            for (const c of findCat ){ await c.remove() };
        }
    }
    const returnProduct = await productRepo.delete({ ProductId: req.query.ProductId as any });
    if (returnProduct) {
        return new SuccessResponse(StatusCodes.OK, {}, 'Product deleted successfully!!').send(res);
    };
};

export const deleteProductCat = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const productCatRepo = database.getRepository(ProductCategoryEntity);
    if(req.query.ProductCategoryId) {
        const orderRepo = database.getRepository(OrdersEntity);
        const findOrder = await orderRepo.find({ where: { ProductCategoryId: req.query.ProductCategoryId as any }});
        if(findOrder){
            for (const o of findOrder) { await o.remove() };
        }
    }
    const returnProduct = await productCatRepo.delete({ ProductCategoryId: req.query.ProductCategoryId as any });
    if (returnProduct) {
        return new SuccessResponse(StatusCodes.OK, {}, 'Product category deleted successfully!!').send(res);
    };
}