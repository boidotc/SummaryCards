module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      id: Number,
      title: String,
      description: String,
      content:[mongoose.Schema.Types.Mixed],
      path_pdf: String,
      topics: [String],
      references: [String]
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Card = mongoose.model("card", schema);
  return Card;
};
