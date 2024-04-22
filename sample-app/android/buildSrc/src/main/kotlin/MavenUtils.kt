import org.gradle.api.Project
import org.gradle.api.artifacts.dsl.RepositoryHandler
import org.gradle.authentication.http.BasicAuthentication
import org.gradle.kotlin.dsl.create

fun RepositoryHandler.configureMapboxMavenRepository(project: Project) {
  maven {
    val mapboxDownloadToken =
      project.getRequiredValueFromEnvOrProperties("MAPBOX_DOWNLOADS_TOKEN", null)

    url = project.uri("https://api.mapbox.com/downloads/v2/releases/maven")
    credentials.username = "mapbox"
    credentials.password = mapboxDownloadToken
    authentication.create<BasicAuthentication>("basic")
  }
}

fun RepositoryHandler.configureAzureMapsMavenRepository(project: Project) {
  maven {
    url = project.uri("https://atlas.microsoft.com/sdk/android")
  }
}

fun RepositoryHandler.setupOmhMapsSnapshotsRepository(project: Project) {
  maven {
    url = project.uri("https://s01.oss.sonatype.org/content/repositories/snapshots/")
  }
}
