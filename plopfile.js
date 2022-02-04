const inputName = {
  type: 'input',
  name: 'name',
  message: 'Name of entity'
}

const domainActions = [
  {
    type: 'addMany',
    destination: 'src/domain/entities/{{dashCase name}}',
    base: 'plop-templates/domain/entity',
    templateFiles: 'plop-templates/domain/entity/*.ts'
  },
  {
      type: 'append',
      path: 'src/domain/entities/index.ts',
      separator: '',
      template: "export * from './{{dashCase name}}';"
  }
]

const factoriesActions = {
  prisma: {
    create: [
      {
        type: 'add',
        path: 'src/main/factories/infra/databases/postgres/prisma/repositories/{{dashCase name}}/prisma-save-{{dashCase name}}-in-database-repository-factory.ts',
        templateFile: 'plop-templates/main/factories/infra/databases/postgres/prisma/repositories/entity/prisma-save-entity-in-database-repository-factory.hbs'
      }
    ],
    list: [
      {
        type: 'add',
        path: 'src/main/factories/infra/databases/postgres/prisma/repositories/{{dashCase name}}/prisma-list-{{dashCase name}}s-from-database-repository-factory.ts',
        templateFile: 'plop-templates/main/factories/infra/databases/postgres/prisma/repositories/entity/prisma-list-entities-from-database-repository-factory.hbs'
      }
    ],
    delete: [
      {
        type: 'add',
        path: 'src/main/factories/infra/databases/postgres/prisma/repositories/{{dashCase name}}/prisma-delete-{{dashCase name}}-from-database-repository-factory.ts',
        templateFile: 'plop-templates/main/factories/infra/databases/postgres/prisma/repositories/entity/prisma-delete-entity-from-database-repository-factory.hbs'
      }
    ],
    update: [
      {
        type: 'add',
        path: 'src/main/factories/infra/databases/postgres/prisma/repositories/{{dashCase name}}/prisma-update-{{dashCase name}}-in-database-repository-factory.ts',
        templateFile: 'plop-templates/main/factories/infra/databases/postgres/prisma/repositories/entity/prisma-update-entity-in-database-repository-factory.hbs'
      }
    ],
  },
  usecases: {
    create: [
      {
        type: 'add',
        path: 'src/main/factories/usecases/{{dashCase name}}/create-{{dashCase name}}-in-database-factory.ts',
        templateFile: 'plop-templates/main/factories/usecases/entity/create-entity-in-database-factory.hbs'
      }
    ],
    list: [
      {
        type: 'add',
        path: 'src/main/factories/usecases/{{dashCase name}}/list-{{dashCase name}}s-from-database-factory.ts',
        templateFile: 'plop-templates/main/factories/usecases/entity/list-entities-from-database-factory.hbs'
      }
    ],
    update: [
      {
        type: 'add',
        path: 'src/main/factories/usecases/{{dashCase name}}/delete-{{dashCase name}}-from-database-factory.ts',
        templateFile: 'plop-templates/main/factories/usecases/entity/delete-entity-from-database-factory.hbs'
      }
    ],
    delete: [
      {
        type: 'add',
        path: 'src/main/factories/usecases/{{dashCase name}}/update-{{dashCase name}}-in-database-factory.ts',
        templateFile: 'plop-templates/main/factories/usecases/entity/update-entity-in-database-factory.hbs'
      }
    ]
  },
  controllers: {
    create: [
      {
        type: 'add',
        path: 'src/main/factories/controllers/{{dashCase name}}/create-{{dashCase name}}-controller-factory.ts',
        templateFile: 'plop-templates/main/factories/controllers/entity/create-entity-controller-factory.hbs'
      }
    ],
    list: [
      {
        type: 'add',
        path: 'src/main/factories/controllers/{{dashCase name}}/list-{{dashCase name}}s-controller-factory.ts',
        templateFile: 'plop-templates/main/factories/controllers/entity/list-entities-controller-factory.hbs'
      }
    ],
    delete: [
      {
        type: 'add',
        path: 'src/main/factories/controllers/{{dashCase name}}/delete-{{dashCase name}}-controller-factory.ts',
        templateFile: 'plop-templates/main/factories/controllers/entity/delete-entity-controller-factory.hbs'
      }
    ],
    update: [
      {
        type: 'add',
        path: 'src/main/factories/controllers/{{dashCase name}}/update-{{dashCase name}}-controller-factory.ts',
        templateFile: 'plop-templates/main/factories/controllers/entity/update-entity-controller-factory.hbs'
      }
    ]
  }
}

const usecasesActions = {
  create: [
    {
      type: 'addMany',
      destination: 'src/domain/usecases/{{dashCase name}}/create-{{dashCase name}}-in-database',
      base: 'plop-templates/domain/usecases/entity/create-entity-in-database',
      templateFiles: 'plop-templates/domain/usecases/entity/create-entity-in-database/**/*.ts'
    },
    ...factoriesActions.usecases.create
  ],
  delete: [
    {
      type: 'addMany',
      destination: 'src/domain/usecases/{{dashCase name}}/delete-{{dashCase name}}-from-database',
      base: 'plop-templates/domain/usecases/entity/delete-entity-from-database',
      templateFiles: 'plop-templates/domain/usecases/entity/delete-entity-from-database/**/*.ts'
    },
    ...factoriesActions.usecases.delete
  ],
  list: [
    {
      type: 'addMany',
      destination: 'src/domain/usecases/{{dashCase name}}/list-{{dashCase name}}s-from-database',
      base: 'plop-templates/domain/usecases/entity/list-entities-from-database',
      templateFiles: 'plop-templates/domain/usecases/entity/list-entities-from-database/**/*.ts'
    },
    ...factoriesActions.usecases.list
  ],
  update: [
    {
      type: 'addMany',
      destination: 'src/domain/usecases/{{dashCase name}}/update-{{dashCase name}}-in-database',
      base: 'plop-templates/domain/usecases/entity/update-entity-in-database',
      templateFiles: 'plop-templates/domain/usecases/entity/update-entity-in-database/**/*.ts'
    },
    ...factoriesActions.usecases.update
  ]
}

const controllersActions = {
  create: [
    {
      type: 'add',
      path: 'src/application/http-server/controllers/{{dashCase name}}/create-{{dashCase name}}-controller.ts',
      templateFile: 'plop-templates/application/http-server/controllers/entity/create-entity-controller.hbs'
    },
    ...factoriesActions.controllers.create
  ],
  delete: [
    {
      type: 'add',
      path: 'src/application/http-server/controllers/{{dashCase name}}/delete-{{dashCase name}}-controller.ts',
      templateFile: 'plop-templates/application/http-server/controllers/entity/delete-entity-controller.hbs'
    },
    ...factoriesActions.controllers.delete
  ],
  list: [
    {
      type: 'add',
      path: 'src/application/http-server/controllers/{{dashCase name}}/list-{{dashCase name}}s-controller.ts',
      templateFile: 'plop-templates/application/http-server/controllers/entity/list-entities-controller.hbs'
    },
    ...factoriesActions.controllers.list
  ],
  update: [
    {
      type: 'add',
      path: 'src/application/http-server/controllers/{{dashCase name}}/update-{{dashCase name}}-controller.ts',
      templateFile: 'plop-templates/application/http-server/controllers/entity/update-entity-controller.hbs'
    },
    ...factoriesActions.controllers.update
  ]
}

const prismaRepositoriesActions = {
  generate: [
    {
      type: 'append',
      path: 'src/infra/databases/postgres/prisma/schema.prisma',
      separator: '',
      templateFile: 'plop-templates/infra/databases/postgres/prisma/prisma-schema.hbs'
    }
  ],
  create: [
    {
      type: 'add',
      path: 'src/infra/databases/postgres/prisma/repositories/{{dashCase name}}/prisma-save-{{dashCase name}}-in-database-repository.ts',
      templateFile: 'plop-templates/infra/databases/postgres/prisma/repositories/entity/prisma-save-entity-in-database-repository.hbs'
    },
    ...factoriesActions.prisma.create
  ],
  delete: [
    {
      type: 'add',
      path: 'src/infra/databases/postgres/prisma/repositories/{{dashCase name}}/prisma-delete-{{dashCase name}}-from-database-repository.ts',
      templateFile: 'plop-templates/infra/databases/postgres/prisma/repositories/entity/prisma-delete-entity-from-database-repository.hbs'
    },
    ...factoriesActions.prisma.delete
  ],
  list: [
    {
      type: 'add',
      path: 'src/infra/databases/postgres/prisma/repositories/{{dashCase name}}/prisma-list-{{dashCase name}}s-from-database-repository.ts',
      templateFile: 'plop-templates/infra/databases/postgres/prisma/repositories/entity/prisma-list-entities-from-database-repository.hbs'
    },
    ...factoriesActions.prisma.list
  ],
  update: [
    {
      type: 'add',
      path: 'src/infra/databases/postgres/prisma/repositories/{{dashCase name}}/prisma-update-{{dashCase name}}-in-database-repository.ts',
      templateFile: 'plop-templates/infra/databases/postgres/prisma/repositories/entity/prisma-update-entity-in-database-repository.hbs'
    },
    ...factoriesActions.prisma.update
  ]
}

const routesActions = {
  create: [
    {
      type: 'add',
      path: 'src/infra/express/routes/{{dashCase name}}-routes.ts',
      templateFile: 'plop-templates/infra/express/routes/entity/entity-routes.hbs'
    },
  ]
}

const swagerActions = {
  create: [
    {
      type: 'add',
      path: 'src/infra/swagger/paths/{{dashCase name}}-paths.ts',
      templateFile: 'plop-templates/infra/swagger/entity/swagger-entity-paths.hbs'
    },
    {
      type: 'append',
      path: 'src/infra/swagger/paths/index.ts',
      separator: '',
      template: "export * from './{{dashCase name}}-paths';\n"
    },
    {
      type: 'modify',
      path: 'src/infra/swagger/helpers/tags.ts',
      pattern: /\[(.*)\]/gim,
      template: "[$1, '{{name}}']"
    }
  ]
}


module.exports = function (plop) {
  plop.setGenerator('[CRUD]: CREATE CRUD Entity', {
    description: 'Create a complete CRUD for a new Entity',
    prompts: [inputName],
    actions: [
      ...domainActions,
      ...usecasesActions.create,
      ...usecasesActions.delete,
      ...usecasesActions.list,
      ...usecasesActions.update,
      {
        type: 'add',
        path: 'src/domain/usecases/{{dashCase name}}/index.ts',
        templateFile: 'plop-templates/domain/usecases/entity/index.hbs'
      },
      {
        type: 'add',
        path: 'src/main/factories/usecases/{{dashCase name}}/index.ts',
        templateFile: 'plop-templates/main/factories/usecases/entity/index.hbs'
      },
      ...controllersActions.create,
      ...controllersActions.list,
      ...controllersActions.update,
      ...controllersActions.delete,
      {
        type: 'add',
        path: 'src/application/http-server/controllers/{{dashCase name}}/index.ts',
        templateFile: 'plop-templates/application/http-server/controllers/entity/index.hbs'
      },
      {
        type: 'add',
        path: 'src/main/factories/controllers/{{dashCase name}}/index.ts',
        templateFile: 'plop-templates/main/factories/controllers/entity/index.hbs'
      },
      ...prismaRepositoriesActions.generate,
      ...prismaRepositoriesActions.create,
      ...prismaRepositoriesActions.list,
      ...prismaRepositoriesActions.update,
      ...prismaRepositoriesActions.delete,
      {
        type: 'add',
        path: 'src/infra/databases/postgres/prisma/repositories/{{dashCase name}}/index.ts',
        templateFile: 'plop-templates/infra/databases/postgres/prisma/repositories/entity/index.hbs'
      },
      {
        type: 'add',
        path: 'src/main/factories/infra/databases/postgres/prisma/repositories/{{dashCase name}}/index.ts',
        templateFile: 'plop-templates/main/factories/infra/databases/postgres/prisma/repositories/entity/index.hbs'
      },
      ...routesActions.create,
      ...swagerActions.create
    ]
  })

  plop.setGenerator('[ENTITIES]: CREATE Entity', {
    description: 'Create entity in domain',
    prompts: [inputName],
    actions: domainActions
  })

  plop.setGenerator('[USECASES]: CRUD for Entity', {
    description: 'Create CRUD usecases for entity',
    prompts: [inputName],
    actions: [
      ...usecasesActions.create,
      ...usecasesActions.delete,
      ...usecasesActions.list,
      ...usecasesActions.update,
      {
        type: 'add',
        path: 'src/domain/usecases/{{dashCase name}}/index.ts',
        templateFile: 'plop-templates/domain/usecases/entity/index.hbs'
      }
    ]
  })

  plop.setGenerator('[USECASES]: CREATE Entity', {
    description: 'Create usecase for create entity in database',
    prompts: [inputName],
    actions: usecasesActions.create
  })

  plop.setGenerator('[USECASES]: DELETE Entity', {
    description: 'Create usecase for delete entity from database',
    prompts: [inputName],
    actions: usecasesActions.delete
  })

  plop.setGenerator('[USECASES]: LIST Entities', {
    description: 'Create usecase for list entities in database',
    prompts: [inputName],
    actions: usecasesActions.list
  })

  plop.setGenerator('[USECASES]: UPDATE Entity', {
    description: 'Create usecase for update entity in database',
    prompts: [inputName],
    actions: usecasesActions.update
  })

  plop.setGenerator('[CONTROLLERS]: CRUD for Entity', {
    description: 'Create CRUD controllers for Entity',
    prompts: [inputName],
    actions: [
      ...controllersActions.create,
      ...controllersActions.list,
      ...controllersActions.update,
      ...controllersActions.delete,
      {
        type: 'add',
        path: 'src/application/http-server/controllers/{{dashCase name}}/index.ts',
        templateFile: 'plop-templates/application/http-server/controllers/entity/index.hbs'
      },
      {
        type: 'add',
        path: 'src/main/factories/controllers/{{dashCase name}}/index.ts',
        templateFile: 'plop-templates/main/factories/controllers/entity/index.hbs'
      }
    ]
  })

  plop.setGenerator('[CONTROLLERS]: CREATE Entity', {
    description: 'Create controller for create entity',
    prompts: [inputName],
    actions: controllersActions.create
  })

  plop.setGenerator('[CONTROLLERS]: DELETE Entity', {
    description: 'Create controller for delete entity',
    prompts: [inputName],
    actions: controllersActions.delete
  })

  plop.setGenerator('[CONTROLLERS]: LIST Entity', {
    description: 'Create controller for list entities',
    prompts: [inputName],
    actions: controllersActions.list
  })

  plop.setGenerator('[CONTROLLERS]: UPDATE Entity', {
    description: 'Create controller for update entity',
    prompts: [inputName],
    actions: controllersActions.update
  })

  plop.setGenerator('[PRISMA]: CRUD for Entity', {
    description: 'Create CRUD prisma repositories for Entity',
    prompts: [inputName],
    actions: [
      ...prismaRepositoriesActions.generate,
      ...prismaRepositoriesActions.create,
      ...prismaRepositoriesActions.list,
      ...prismaRepositoriesActions.update,
      ...prismaRepositoriesActions.delete,
      {
        type: 'add',
        path: 'src/infra/databases/postgres/prisma/repositories/{{dashCase name}}/index.ts',
        templateFile: 'plop-templates/infra/databases/postgres/prisma/repositories/entity/index.hbs'
      },
      {
        type: 'add',
        path: 'src/main/factories/infra/databases/postgres/prisma/repositories/{{dashCase name}}/index.ts',
        templateFile: 'plop-templates/main/factories/infra/databases/postgres/prisma/repositories/entity/index.hbs'
      }
    ]
  })

  plop.setGenerator('[PRISMA]: GENERATE Entity', {
    description: 'Generate Entity model in prisma schema',
    prompts: [inputName],
    actions: prismaRepositoriesActions.generate
  })

  plop.setGenerator('[PRISMA]: CREATE Entity', {
    description: 'Create prisma repository for create entity in database',
    prompts: [inputName],
    actions: prismaRepositoriesActions.create,
  })

  plop.setGenerator('[PRISMA]: LIST Entities', {
    description: 'Create prisma repository for list entities from database',
    prompts: [inputName],
    actions: prismaRepositoriesActions.list
  })

  plop.setGenerator('[PRISMA]: DELETE Entity', {
    description: 'Create prisma repository for delete entity from database',
    prompts: [inputName],
    actions: prismaRepositoriesActions.delete
  })

  plop.setGenerator('[PRISMA]: UPDATE Entity', {
    description: 'Create prisma repository for update entity in database',
    prompts: [inputName],
    actions: prismaRepositoriesActions.update
  })

  plop.setGenerator('[FACTORIES]: PRISMA CRUD Entity', {
    description: 'Generate factory for prisma CRUD in database repository',
    prompts: [inputName],
    actions: [
      ...factoriesActions.prisma.create,
      ...factoriesActions.prisma.list,
      ...factoriesActions.prisma.delete,
      ...factoriesActions.prisma.update,
      {
        type: 'add',
        path: 'src/main/factories/infra/databases/postgres/prisma/repositories/{{dashCase name}}/index.ts',
        templateFile: 'plop-templates/main/factories/infra/databases/postgres/prisma/repositories/entity/index.hbs'
      }
    ]
  })

  plop.setGenerator('[FACTORIES]: PRISMA SAVE Entity', {
    description: 'Generate factory for prisma save entity in database repository',
    prompts: [inputName],
    actions: factoriesActions.prisma.create
  })

  plop.setGenerator('[FACTORIES]: PRISMA LIST Entities', {
    description: 'Generate factory for prisma list entities from database repository',
    prompts: [inputName],
    actions: factoriesActions.prisma.list
  })

  plop.setGenerator('[FACTORIES]: PRISMA DELETE Entity', {
    description: 'Generate factory for prisma delete entity from database repository',
    prompts: [inputName],
    actions: factoriesActions.prisma.delete
  })

  plop.setGenerator('[FACTORIES]: PRISMA UPDATE Entity', {
    description: 'Generate factory for prisma update entitie from database repository',
    prompts: [inputName],
    actions: factoriesActions.prisma.update
  })

  plop.setGenerator('[FACTORIES]: USECASE CRUD Entity', {
    description: 'Generate factory for CRUD of entity usecases',
    prompts: [inputName],
    actions: [
      ...factoriesActions.usecases.create,
      ...factoriesActions.usecases.list,
      ...factoriesActions.usecases.update,
      ...factoriesActions.usecases.delete,
      {
        type: 'add',
        path: 'src/main/factories/usecases/{{dashCase name}}/index.ts',
        templateFile: 'plop-templates/main/factories/usecases/entity/index.hbs'
      }
    ]
  })

  plop.setGenerator('[FACTORIES]: USECASE CREATE Entity', {
    description: 'Generate factory for create entity usecase',
    prompts: [inputName],
    actions: factoriesActions.usecases.create
  })

  plop.setGenerator('[FACTORIES]: USECASE LIST Entities', {
    description: 'Generate factory for list entities usecase',
    prompts: [inputName],
    actions: factoriesActions.usecases.list
  })

  plop.setGenerator('[FACTORIES]: USECASE DELETE Entity', {
    description: 'Generate factory for delete entity usecase',
    prompts: [inputName],
    actions: factoriesActions.usecases.delete
  })

  plop.setGenerator('[FACTORIES]: USECASE UPDATED Entity', {
    description: 'Generate factory for update entity usecase',
    prompts: [inputName],
    actions: factoriesActions.usecases.update
  })

  plop.setGenerator('[FACTORIES]: CONTROLLER CRUD Entity', {
    description: 'Generate factory for crud controllers of entity',
    prompts: [inputName],
    actions: [
      ...factoriesActions.controllers.create,
      ...factoriesActions.controllers.list,
      ...factoriesActions.controllers.delete,
      ...factoriesActions.controllers.update,
      {
        type: 'add',
        path: 'src/main/factories/controllers/{{dashCase name}}/index.ts',
        templateFile: 'plop-templates/main/factories/controllers/entity/index.hbs'
      }
    ]
  })

  plop.setGenerator('[FACTORIES]: CONTROLLER CREATE Entity', {
    description: 'Generate factory for controller of create entity',
    prompts: [inputName],
    actions: factoriesActions.controllers.create
  })

  plop.setGenerator('[FACTORIES]: CONTROLLER LIST Entities', {
    description: 'Generate factory for controller of list entities',
    prompts: [inputName],
    actions: factoriesActions.controllers.list
  })

  plop.setGenerator('[FACTORIES]: CONTROLLER DELETE Entity', {
    description: 'Generate factory for controller of delete entity',
    prompts: [inputName],
    actions: factoriesActions.controllers.delete
  })

  plop.setGenerator('[FACTORIES]: CONTROLLER UPDATE Entity', {
    description: 'Generate factory for controller of update entity',
    prompts: [inputName],
    actions: factoriesActions.controllers.update
  })

  plop.setGenerator('[ROUTES]: CREATE Entity express routes', {
    description: 'Generate express routes for entity',
    prompts: [inputName],
    actions: routesActions.create
  })

  plop.setGenerator('[DOCS]: CREATE DOCS Entity', {
    description: 'Generate swagger docs for entity routes',
    prompts: [inputName],
    actions: swagerActions.create
  })
}
