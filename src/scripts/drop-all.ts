import * as Model from '../app/models/sequelize.model';

Model.sequelize.drop({
    cascade: true
});