class Boaredsauce.Models.Poll extends Boaredsauce.Models.BaseModel
  type: 'poll'
  belongs_to: ['user']
  has_many: ['poll_choices']