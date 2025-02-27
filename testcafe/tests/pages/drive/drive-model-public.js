import { t } from 'testcafe'
import { isExistingAndVisibile, getPageUrl, goBack } from '../../helpers/utils'
import * as selectors from '../selectors'
import DrivePage from './drive-model'

export default class PublicDrivePage extends DrivePage {
  // @param {string} type : 'file' or 'folder' : the toolbar is different depending on share type
  async checkActionMenuPublicDesktop(type) {
    const isFile = type === 'file' ? true : false
    await t //Mobile elements don't exist
      .expect(selectors.btnMoreMenu.exists)
      .notOk('[...] Menu exists')
      .expect(selectors.innerPublicMoreMenu.exists)
      .notOk('Inner More Menu exists')
    await isExistingAndVisibile(selectors.logo, 'Logo')
    await isExistingAndVisibile(
      isFile ? selectors.toolbarViewerPublic : selectors.toolbarDrivePublic,
      'toolbarDrive'
    )
    await isExistingAndVisibile(
      isFile
        ? selectors.btnViewerPublicCreateCozy
        : selectors.btnDrivePublicCreateCozy,
      'Create my Cozy Button'
    )
    await isExistingAndVisibile(
      selectors.btnPublicDownloadDrive,
      'Download FolderButton'
    )
  }

  // @param {string} type : 'file' or 'folder' : the toolbar is different depending on share type
  async checkDesktopElementsNotShowingOnMobile(type) {
    const isFile = type === 'file' ? true : false
    await t
      .expect(selectors.btnPublicDownloadDrive.exists)
      .notOk('Download Button (desktop) exists')
      //On File Sharing, logo still exist on mobile, but is not visible (no problem on folder)
      .expect(isFile ? selectors.logo.visible : selectors.logo.exists)
      .notOk('Logo exists/visible')
      .expect(
        (isFile ? selectors.toolbarViewerPublic : selectors.toolbarDrivePublic)
          .exists
      )
      .notOk('toolbar_file exists')
      .expect(selectors.btnViewerPublicCreateCozy.exists)
      .notOk('Create Cozy button (desktop) exists')
  }

  async checkCreateCozy() {
    await t
      .expect(getPageUrl())
      .eql(
        'https://manager.cozycloud.cc/cozy/create?pk_campaign=sharing-drive&pk_kwd=cozy'
      )

    await goBack()
  }
  async checkDownloadButtonOnMobile() {
    await isExistingAndVisibile(selectors.btnMoreMenu, '[...] Button')
    await t.click(selectors.btnMoreMenu, { speed: 0.5 })
    await isExistingAndVisibile(
      selectors.innerPublicMoreMenu,
      'Innner More Menu'
    )
    await isExistingAndVisibile(
      selectors.btnPublicMobileDownload,
      'Download Button (mobile)'
    )
  }
  async checkCozyCreationButtonOnMobile() {
    await isExistingAndVisibile(selectors.btnMoreMenu, '[...] Button')
    await t.click(selectors.btnMoreMenu, { speed: 0.5 })
    await isExistingAndVisibile(
      selectors.innerPublicMoreMenu,
      'Innner More Menu'
    )
    await isExistingAndVisibile(
      selectors.btnPublicMobileCreateCozy,
      'Create my Cozy Button (mobile)'
    )
  }

  async checkNotAvailable() {
    await isExistingAndVisibile(
      selectors.errorAvailable,
      'Not available message'
    )
  }
}
