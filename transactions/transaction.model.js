const { Schema, model } = require("mongoose");
const { USER_MODEL_NAME } = require("../auth/auth.constants");
const { CountsConstants } = require("../directories/counts");
const { CategoriesConstants } = require("../directories/categories");

const {
  TRANSACTION_MODEL_NAME,
  TransactionTypeEnum,
} = require("./transactions.constants");

// const transactionSchema = new Schema(
//   {
//     athor: {
//       type: String,
//     },
//     creator: {
//       type: String,
//     },
//     auditor: {
//       type: String,
//     },
//     transactionDate: {
//       type: Date,
//       default: new Date(),
//     },
//     type: {
//       type: String,
//       enum: TransactionsConstants.TransactionsTypeEnum,
//     },
//     countIdIn: {
//       type: String,
//     },
//     subCountIdIn: {
//       type: String,
//     },
//     countIdOut: {
//       type: String,
//     },
//     subCountIdOut: {
//       type: String,
//     },
//     categoryId: {
//       type: String,
//     },
//     subCategoryId: {
//       type: String,
//     },
//     document: {
//       type: String,
//     },
//     project: {
//       type: String,
//     },
//     contractor: {
//       type: String,
//     },
//     amount: {
//       type: Number,
//     },
//     status: {
//       type: String,
//     },
//     mark: {
//       type: String,
//     },
//     tags: {
//       type: [
//         {
//           type: String,
//         },
//       ],
//       eachPath: true,
//     },
//     comment: {
//       type: String,
//     },
//   },
//   {
//     versionKey: false,
//     timestamps: true,
//   }
// );

// const TransactionModel = model("transaction", transactionSchema);
// module.exports = TransactionModel;

// const CreateTransactionModel = (copanyId) =>
//   model("transaction", transactionSchema, `transactions_${copanyId}`);
// const TransactionModel_ = CreateTransactionModel("021542");

const transactionSchema = new Schema(
  {
    athor: {
      type: Schema.Types.ObjectId,
      ref: USER_MODEL_NAME,
    },
    editor: {
      type: Schema.Types.ObjectId,
      ref: USER_MODEL_NAME,
    },
    auditor: {
      type: Schema.Types.ObjectId,
      ref: USER_MODEL_NAME,
    },
    transactionDate: {
      type: Date,
      default: new Date(),
    },
    type: {
      type: String,
      enum: TransactionTypeEnum,
    },
    countIdIn: {
      type: Schema.Types.ObjectId,
      ref: CountsConstants.COUNT_MODEL_NAME,
    },
    subCountIdIn: {
      type: Schema.Types.ObjectId,
      ref: CountsConstants.COUNT_MODEL_NAME,
    },
    countIdOut: {
      type: Schema.Types.ObjectId,
      ref: CountsConstants.COUNT_MODEL_NAME,
    },
    subCountIdOut: {
      type: Schema.Types.ObjectId,
      ref: CountsConstants.COUNT_MODEL_NAME,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: CategoriesConstants.CATEGORY_MODEL_NAME,
    },
    subCategoryId: {
      type: Schema.Types.ObjectId,
      ref: CategoriesConstants.CATEGORY_MODEL_NAME,
    },
    amount: {
      type: Number,
      // required: [true, `Amount is required`],
    },
    document: {
      type: String,
    },
    project: {
      type: Schema.Types.ObjectId,
    },
    contractor: {
      type: Schema.Types.ObjectId,
    },
    status: {
      type: Schema.Types.ObjectId,
    },
    mark: {
      type: Schema.Types.ObjectId,
    },
    tags: {
      type: [
        {
          type: String,
        },
      ],
      eachPath: true,
    },
    comment: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const TransactionModel = model(
  TRANSACTION_MODEL_NAME,
  transactionSchema,
  `transactions_32dfr1b3d5f1gb3d2g`
);

module.exports = TransactionModel;
