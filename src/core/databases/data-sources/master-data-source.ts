import { DataSource } from 'typeorm';
import { masterDataSourceConfig } from '../configs/master-data-source.config';

export const MasterDataSource = new DataSource(masterDataSourceConfig);
