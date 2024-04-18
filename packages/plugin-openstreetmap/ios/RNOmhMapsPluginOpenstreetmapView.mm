#ifdef RCT_NEW_ARCH_ENABLED
#import "RNOmhMapsPluginOpenstreetmapView.h"

#import <react/renderer/components/RNRNOmhMapsPluginOpenstreetmapViewSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNRNOmhMapsPluginOpenstreetmapViewSpec/EventEmitters.h>
#import <react/renderer/components/RNRNOmhMapsPluginOpenstreetmapViewSpec/Props.h>
#import <react/renderer/components/RNRNOmhMapsPluginOpenstreetmapViewSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"
#import "Utils.h"

using namespace facebook::react;

@interface RNOmhMapsPluginOpenstreetmapView () <RCTRNOmhMapsPluginOpenstreetmapViewViewProtocol>

@end

@implementation RNOmhMapsPluginOpenstreetmapView {
    UIView * _view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
    return concreteComponentDescriptorProvider<RNOmhMapsPluginOpenstreetmapViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const RNOmhMapsPluginOpenstreetmapViewProps>();
    _props = defaultProps;

    _view = [[UIView alloc] init];

    self.contentView = _view;
  }

  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<RNOmhMapsPluginOpenstreetmapViewProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<RNOmhMapsPluginOpenstreetmapViewProps const>(props);

    if (oldViewProps.color != newViewProps.color) {
        NSString * colorToConvert = [[NSString alloc] initWithUTF8String: newViewProps.color.c_str()];
        [_view setBackgroundColor: [Utils hexStringToColor:colorToConvert]];
    }

    [super updateProps:props oldProps:oldProps];
}

Class<RCTComponentViewProtocol> RNOmhMapsPluginOpenstreetmapViewCls(void)
{
    return RNOmhMapsPluginOpenstreetmapView.class;
}

@end
#endif
