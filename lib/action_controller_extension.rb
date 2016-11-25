module ActionController
  class Responder

    def display_errors
      controller.render(@options.merge(format => resource_errors, :status => :unprocessable_entity))
    end

  end
end