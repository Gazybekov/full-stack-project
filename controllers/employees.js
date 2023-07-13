const { prisma } = require("../prisma/prisma-client");

// @route  GET api/employees

//@ desc Получение всех сотрудников
//@ access Private

const all = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();

    res.status(200).json(employees);
  } catch {
    res.status(500).json({ message: "Не удалось получить сотрудников" });
  }
};

// @route POST  api/employees/add

//@ desc Добавление сотрудника
//@ access Private

const add = async (req, res) => {
  try {
    const data = req.body;
    if (!data.firstName || !data.lastName || !data.address || !data.age) {
      return res.status(400).json({ message: "Все поля обязательны!" });
    }
    //  await prisma.user.update({
    //   where: {
    //     id: data.userId,
    //   },

    //   data: {
    //     createdEmployee: {
    //       create: {
    //         firstName: data.firstName,
    //         lastName: data.lastName,
    //         address: data.address,
    //         age: data.age,
    //       },
    //     },
    //   },
    // });

    const employee = await prisma.employee.create({
      data: {
        ...data,
        userId: data.userId,
      },
    });

    return res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//@ route POST api/employees/remove/:id
//@desc удаление сотрудника
//@ access Private

const remove = async (req, res) => {
  const { id } = req.body;
  try {
    await prisma.employee.delete({
      where: {
        id: id,
      },
    });

    res.status(204).json("OK");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//@ route PUT api/employees/edit/:id
//@desc редактирование сотрудника
//@ access Private

const edit = async (req, res) => {
  const data = req.body;
  const id = data.id;

  try {
    await prisma.employee.update({
      where: {
        id,
      },
      data,
    });

    return res.status(204).json("OK");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const employee = async (req, res) => {
  const { id } = req.params; //http://localhost:8080/api/employees/688717f4-4288-4200-943f-e310d1b80088

  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });

    return res.status(200).json(employee);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  all,
  add,
  remove,
  edit,
  employee,
};
