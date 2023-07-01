import { nameOf } from "../helpers/helper";
import { MetaDataEntity } from "../model/Tables/metaData.model";
import { static_meta_data } from "../staticData/staticData";
import { connectToDatabase } from "../utils/DatabaseUtils";

export const InsertAllStaticData = async () => {
    await InsertMetaData();
};

export const InsertMetaData = async () => {
    try {
        const database = await connectToDatabase();
        const MetaDataRepo = database.getRepository(MetaDataEntity);
        for (let data of static_meta_data) {
            await MetaDataRepo.upsert({
                Type: data.Type,
                Value: data.Value
            }, {
                conflictPaths: [nameOf<MetaDataEntity>('Type'), nameOf<MetaDataEntity>('Value')]
            })
        }
    } catch (error: any) {
        console.error(error)
    }
};