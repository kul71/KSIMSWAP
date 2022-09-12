#References for setting up project


https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript
--------
Error while loading rule '@typescript-eslint/dot-notation': You have used a rule which requires parserServices to be generated. You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser
> solution: https://stackoverflow.com/questions/64116378/error-while-loading-rule-typescript-eslint-dot-notation
-------
This rule requires the `strictNullChecks` compiler option to be turned on to function correctly  @typescript-eslint/strict-boolean-expressions
> solution: https://github.com/standard/eslint-config-standard-with-typescript/issues/481
