import { EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Appointment: {}
};
const pluralNames = { Appointments: 'Appointments' };
export const entityConfig = {
  entityMetadata,
  pluralNames
};
