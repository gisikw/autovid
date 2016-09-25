# One app to solve all the problems

Things it should do:

- [X] Provide a calendar view of scheduled/uploaded videos

- [X] Auto-upload files that are dropped into a folder
  - Example: KSP041
    - [X] Oh, that's KSProgramming
    - [X] KSProgramming needs theses tags
    - [X] KSProgramming goes out on 2pm Sundays
    - [X] KSP041.mp4 should have KSP041.jpg thumbnail
    - [X] KSProgramming needs a link to the github in its description
  - Caveats:
    - [ ] Handling race conditions and ensuring no duplicates
      - Solution:
        - Folder "upload" where files are manually placed
        - 1 Uploader - finds "KSP047.mp4", "KSP047.jpg"
            def perform
              loop do
                video = first_upload_candidate_in_folder # KSP047
                YouTube.for_each_broken_video_named("KSP047")
                  delete that video
                end
                if YouTube.has_uploaded_video_named("KSP047")
                  move video to tag folder
                else
                  start_upload!
        - 1 Tagger monitors "tag" folder
          def perform
            loop do
              finds "KSP047.mp4"
              looks up Series.where(prefix: "KSP")
              YouTube.add_metadata(series)
              YouTube.add_thumbnail("KSP047.jpg")
              YouTube.schedule(series.appropriate_next_video_time)
              move file to archive folder

- [ ] Auto-import footage from SD cards

- [ ] Auto-reencode screen recordings as CFR

- [X] Host it somewhere
