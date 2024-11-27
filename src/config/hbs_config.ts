import { Express } from 'express';
import { engine } from 'express-handlebars';
import Handlebars from 'handlebars';
import { runInThisContext } from 'vm';


export const setupHandlebars = (app: Express): void => {
  Handlebars.registerHelper('range', function (start, end) {
    const rangeArray = [];
    for (let i = start; i <= end; i++) {
      rangeArray.push(i);
    }
    return rangeArray;
  });

  Handlebars.registerHelper('eqLogin', function (a: any, options) {
    if (a == 'Log In') return options.inverse(runInThisContext);
    return options.fn(runInThisContext);
  });

  app.engine(
    'handlebars',
    engine({
      defaultLayout: 'main',
      extname: '.handlebars',
    })
  );
  app.set('view engine', 'handlebars');
  app.set('views', 'src/views');
};