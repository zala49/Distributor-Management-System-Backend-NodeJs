import { Response } from 'express';
import { CustomRequest } from '../interfaces/request.interface';
import { SuccessResponse } from '../common/ApiResponse';
import { StatusCodes } from 'http-status-codes';
import { connectToDatabase } from '../utils/DatabaseUtils';
import { nameOf } from '../helpers/helper';
import { ProductEntity } from '../model/Tables/product.model';

export const insertProduct = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const productRepo = database.getRepository(ProductEntity);
    const returnProduct = productRepo.upsert({
        ProductName: req.body.ProductName,
        ProductCategory: req.body.ProductCategory
    }, {
        conflictPaths: [nameOf<ProductEntity>('ProductName'), nameOf<ProductEntity>('ProductCategory')]
    });
    return new SuccessResponse(StatusCodes.OK, returnProduct, 'Added product successfully!!').send(res);
};
export const getProducts = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const productRepo = database.getRepository(ProductEntity);
    const returnProduct = productRepo.find();
    if (returnProduct) {
        return new SuccessResponse(StatusCodes.OK, returnProduct, 'Get product successfully!!').send(res);
    };
};

export const updateProduct = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const productRepo = database.getRepository(ProductEntity);
    const returnProduct = productRepo.findOne({ where: { ProductId: req.query.ProductId as any } })
    const updatedData = { ...returnProduct, ...req.body }
    const update = await productRepo.update(req.query.ProductId as any, updatedData);
    if (update) {
        return new SuccessResponse(StatusCodes.OK, updatedData, 'Updated product successfully!!').send(res);
    };
};

export const deleteProduct = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const productRepo = database.getRepository(ProductEntity);
    const returnProduct = await productRepo.delete({ ProductId: req.query.ProductId as any });
    if (returnProduct) {
        return new SuccessResponse(StatusCodes.OK, {}, 'Product deleted successfully!!').send(res);
    };
};