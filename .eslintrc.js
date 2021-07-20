module.exports = {
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    '@tencent/eslint-config-tencent',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
    'babel',
  ],
  rules: {
    'no-alert': 1,
    'linebreak-style': ['error', 'unix'],
    // vue
    'vue/component-tags-order': ['error', { order: ['template', 'script', 'style'] }],
    'vue/html-self-closing': 'off',
    'vue/no-parsing-error': [
      2,
      {
        'x-invalid-end-tag': false,
      },
    ],
    'vue/no-v-model-argument': 0,
    'vue/no-multiple-template-root': 0,

    'no-const-assign': 2, // 禁止修改const声明的变量
    'prefer-const': 1, // 如果一个变量不会被重新赋值，最好使用const进行声明
    'no-var': 2, // 要求使用 let 或 const 而不是 var
    'no-new-object': 2, // 禁止使用 Object 构造函数
    'object-shorthand': 2, // 要求对象字面量简写语法
    'quote-props': [2, 'as-needed'], // 要求对象字面量属性名称使用引号
    'no-prototype-builtins': 2, // 禁止直接使用 Object.prototypes 的内置属性
    'no-array-constructor': 2, // 禁用 Array 构造函数
    'array-callback-return': 2, // 强制数组方法的回调函数中有 return 语句
    'prefer-destructuring': 2, // 优先使用数组和对象解构
    quotes: [2, 'single'], // 强制使用一致的单引号
    'template-curly-spacing': 2, // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
    'prefer-template': 2, // 建议使用模板字面量而非字符串连接
    'no-eval': 2, // 禁用 eval()
    'no-useless-escape': 2, // 禁用不必要的转义字符
    'func-style': [2, 'expression'], // 强制一致地使用 function 声明或表达式
    'wrap-iife': [2, 'inside'], // 要求 IIFE 使用括号括起来
    'no-loop-func': 2, // 禁止在循环语句中出现包含不安全引用的函数声明
    'prefer-rest-params': 2, // 要求使用剩余参数而不是 arguments
    'no-new-func': 2, // 禁止对 Function 对象使用 new 操作符
    'space-before-function-paren': 0, // 要求或禁止函数圆括号之前有一个空格
    'no-param-reassign': 2, // 禁止对 function 的参数进行重新赋值
    'prefer-spread': 2, // 要求使用扩展运算符而非 .apply()
    'prefer-arrow-callback': 2, // 要求使用箭头函数作为回调
    'arrow-spacing': 2, // 强制箭头函数的箭头前后使用一致的空格
    'arrow-body-style': [2, 'always'], // 要求箭头函数体使用大括号
    'arrow-parens': 2, // 要求箭头函数的参数使用圆括号
    'no-confusing-arrow': 2, // 禁止在可能与比较操作符相混淆的地方使用箭头函数
    'implicit-arrow-linebreak': 2, // 强制隐式返回的箭头函数体的位置
    'no-duplicate-imports': 2, // 禁止重复模块导入
    'no-iterator': 2, // 禁用迭代器 __iterator__ 属性
    'generator-star-spacing': [2, 'after'], // 强制 generator 函数中 * 号周围使用一致的空格
    'dot-notation': 2, // 强制尽可能地使用点号
    'no-undef': 2, // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    'one-var': [2, 'never'], // 强制函数中的变量在一起声明或分开声明
    'no-multi-assign': 2, // 禁止连续赋值
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }], // 禁止使用一元操作符 ++ 和 -- 允许在 for 循环的最后一个表达式中使用 ++ 和 --
    // 'no-unused-vars': 2, // 禁止出现未使用过的变量
    eqeqeq: 2, // 要求使用 === 和 !==
    'no-case-declarations': 2, // 不允许在 case 子句中使用词法声明
    'no-nested-ternary': 2, // 禁用嵌套的三元表达式
    'no-unneeded-ternary': 2, // 禁止可以在有更简单的可替代的表达式时使用三元操作符
    'no-mixed-operators': [
      2,
      {
        groups: [
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
        allowSamePrecedence: true,
      },
    ], // 禁止混合使用不同的操作符
    'nonblock-statement-body-position': 2, // 强制单个语句的位置
    'brace-style': 2, // 强制在代码块中使用一致的大括号风格
    'no-else-return': 2, // 禁止 if 语句中 return 语句之后有 else 块
    'spaced-comment': 2, // 强制在注释中 // 或 /* 使用一致的空格
    'no-with': 2, // 禁用 with 语句
    'guard-for-in': 2, // 要求 for-in 循环中有一个 if 语句
    indent: [2, 2, { SwitchCase: 1 }], // 强制使用一致的缩进
    'space-before-blocks': 2, // 强制在块之前使用一致的空格
    'keyword-spacing': 2, // 强制在关键字前后使用一致的空格
    'space-infix-ops': 2, // 要求操作符周围有空格
    'eol-last': 2, // 要求或禁止文件末尾存在空行
    'no-whitespace-before-property': 2, // 禁止属性前有空白
    'padded-blocks': [2, 'never'], // 要求或禁止块内填充
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }], // 禁止出现多行空行
    'space-in-parens': 2, // 强制在圆括号内使用一致的空格
    'array-bracket-spacing': 2, // 禁止或强制在括号内使用空格
    'object-curly-spacing': [2, 'always'], // 强制在大括号中使用一致的空格
    'max-len': 0, // 强制行的最大长度
    'block-spacing': 2, // 禁止或强制在代码块中开括号前和闭括号后有空格
    'comma-spacing': 2, // 强制在逗号周围使用空格
    'computed-property-spacing': 2, // 强制在计算的属性的方括号中使用一致的空格
    'func-call-spacing': 2, // 要求或禁止在函数标识符和其调用之间有空格
    'key-spacing': 2, // 强制在对象字面量的属性中键和值之间使用一致的间距
    'no-trailing-spaces': 2, // 禁用行尾空格
    'comma-style': 2, // 强制使用一致的逗号风格
    'comma-dangle': [2, 'always-multiline'], // 要求或禁止末尾逗号
    camelcase: 2, // 要求使用骆驼拼写法
    'new-cap': 2, // 要求构造函数首字母大写
    'no-underscore-dangle': 2, // 禁止标识符中有悬空下划线
    'no-extra-semi': 2, // 禁止不必要的分号
    semi: 2, // 要求或禁止使用分号代替 ASI
    // 可以使用any
    '@typescript-eslint/no-explicit-any': 0,
    // 函数可以不确定返回类型
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': ['error', {
      varsIgnorePattern: 'Taro',
    }],
  },
};
