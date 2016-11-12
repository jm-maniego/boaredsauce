json.extract! poll, :id, :text, :created_at, :updated_at
json.url poll_url(poll, format: :json)