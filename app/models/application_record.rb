class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  include ApiPresentable

  class ActiveRecord::Relation
    include ApiPresentable::Collection
  end
end
