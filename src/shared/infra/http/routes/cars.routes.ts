import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarController } from '@modules/cars/useCases/listAvailableCar/ListAvailableCarController';
import { UploadCarImageController } from '@modules/cars/useCases/uploadCarImage/UploadCarImageController';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableController = new ListAvailableCarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

const upload = multer(uploadConfig.upload('./tmp/cars'));

carsRoutes.post(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle
);

carsRoutes.get('/available', listAvailableController.handle);

carsRoutes.post(
    '/specifications/:id',
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle
);

carsRoutes.post(
    '/images/:id',
    ensureAuthenticated,
    ensureAdmin,
    upload.array('images'),
    uploadCarImageController.handle
);

export { carsRoutes };
