const router = require('express').Router();
const { getTeacher, createTeacher, updateTeacher, deleteTeacher } = require('../controllers/teacher_controller');
const authorized = require('../middlewares/auth_require');
const rolPermitido = require('../middlewares/require_role');

const validate = require('../middlewares/validator');
const { body } = require('express-validator');

const teacherValidation = [
    body('name').isString().withMessage('El nombre es obligatorio y debe ser una cadena'),
    body('age').isNumeric().withMessage('La edad debe ser un número'),
    body('email').isEmail().withMessage('El correo electrónico es obligatorio y debe ser válido')
];

router.use(authorized);

/**
 * @swagger
 * /teacher/{:email}
 *   get:
 *     summary: Obtener un profesor por email
 *     response:
 *       200:
 *         description: Profesor encontrado
 * 
 */



router.get("/{:email}", rolPermitido('teacher'), getTeacher);





router.post('/', teacherValidation, rolPermitido('teacher'), validate, createTeacher);
router.put('/:id', teacherValidation, rolPermitido('teacher'), validate, updateTeacher);
router.delete("/:id", rolPermitido('admin'), deleteTeacher);

module.exports = router;