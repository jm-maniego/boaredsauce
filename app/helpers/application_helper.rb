module ApplicationHelper
  def content_defined?(*contents)
    if contents.any?
      yield
    end
  end
end
