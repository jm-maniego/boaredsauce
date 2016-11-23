module ApplicationHelper
  def content_defined?(*contents)
    if contents.any?
      yield
    end
  end

  def link_to(name = nil, options = nil, html_options = nil, &block)
    if link_name = name.try(:url)
      options = name
      name = link_name
    end
    super
  end
end
