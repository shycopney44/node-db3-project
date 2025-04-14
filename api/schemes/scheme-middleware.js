// const db = require('../../data/db-config')

// /*
//   If `scheme_id` does not exist in the database:

//   status 404
//   {
//     "message": "scheme with scheme_id <actual id> not found"
//   }
// */
// const checkSchemeId = async (req, res, next) => {
//   try {
//     const existing = await db('schemes')
//     .wherere('scheme_id', req.params.scheme_id)
//     .first()

//     if (!existing) {
//       next({ status: 404, 
//       message: `scheme with scheme_id ${req.params.scheme_id} not found` })
//     } else {
//       next()
//     }
//   } catch (err) {
//     next(err)
//   }
// }

// /*
//   If `scheme_name` is missing, empty string or not a string:

//   status 400
//   {
//     "message": "invalid scheme_name"
//   }
// */
// const validateScheme = (req, res, next) => {
//   const { scheme_name } = req.body
//   if (
//     scheme_name === undefined ||
//     typeof scheme_name !== 'string' ||
//     !scheme_name.trim()
//   ) {
//     next({ status: 400, message: 'invalid scheme_name' })
//   } else {
//     next()
//   }
// }

// /*
//   If `instructions` is missing, empty string or not a string, or
//   if `step_number` is not a number or is smaller than one:

//   status 400
//   {
//     "message": "invalid step"
//   }
// */
// const validateStep = (req, res, next) => {
//   const { instructions, step_number } = req.body
//   if (
//     instructions === undefined ||
//     typeof instructions !== 'string' ||
//     !instructions.trim() ||
//     typeof step_number !== 'number' ||
//     step_number < 1
//   ) {
//     next({ status: 400, message: 'invalid step' })
//   } else {
//     next()
//   }
// }

// module.exports = {
//   checkSchemeId,
//   validateScheme,
//   validateStep,
// }

const db = require('../../data/db-config');

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const existing = await db('schemes')
      .where('scheme_id', req.params.scheme_id) // Fixed typo: "wherere" -> "where"
      .first();

    if (!existing) {
      next({
        status: 404,
        message: `scheme with scheme_id ${req.params.scheme_id} not found`,
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

/*
  If `scheme_name` is missing, empty string, or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const { scheme_name } = req.body;
  if (
    scheme_name === undefined || // Checks if scheme_name is missing
    typeof scheme_name !== 'string' || // Checks if it's not a string
    !scheme_name.trim() // Checks if it's an empty string
  ) {
    next({ status: 400, message: 'invalid scheme_name' });
  } else {
    next();
  }
};

/*
  If `instructions` is missing, empty string, or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
function validateStep(req, res, next) {
  const { instructions, step_number } = req.body;
  if (
    !instructions || // Checks if instructions are missing
    typeof instructions !== 'string' || // Checks if it's not a string
    !instructions.trim() || // Checks if it's an empty string
    typeof step_number !== 'number' || // Checks if step_number is not a number
    step_number < 1 // Checks if step_number is less than 1
  ) {
    next({ status: 400, message: 'invalid step' });
  } else {
    next();
  }
}


module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};

