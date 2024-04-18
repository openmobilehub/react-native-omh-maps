#ifdef RCT_NEW_ARCH_ENABLED
#import "RNOmhMapsPluginAzuremapsView.h"

#import <react/renderer/components/RNRNOmhMapsPluginAzuremapsViewSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNRNOmhMapsPluginAzuremapsViewSpec/EventEmitters.h>
#import <react/renderer/components/RNRNOmhMapsPluginAzuremapsViewSpec/Props.h>
#import <react/renderer/components/RNRNOmhMapsPluginAzuremapsViewSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"
#import "Utils.h"

using namespace facebook::react;

@interface RNOmhMapsPluginAzuremapsView () <RCTRNOmhMapsPluginAzuremapsViewViewProtocol>

@end

@implementation RNOmhMapsPluginAzuremapsView {
    UIView * _view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
    return concreteComponentDescriptorProvider<RNOmhMapsPluginAzuremapsViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const RNOmhMapsPluginAzuremapsViewProps>();
    _props = defaultProps;

    _view = [[UIView alloc] init];

    self.contentView = _view;
  }

  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<RNOmhMapsPluginAzuremapsViewProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<RNOmhMapsPluginAzuremapsViewProps const>(props);

    if (oldViewProps.color != newViewProps.color) {
        NSString * colorToConvert = [[NSString alloc] initWithUTF8String: newViewProps.color.c_str()];
        [_view setBackgroundColor: [Utils hexStringToColor:colorToConvert]];
    }

    [super updateProps:props oldProps:oldProps];
}

Class<RCTComponentViewProtocol> RNOmhMapsPluginAzuremapsViewCls(void)
{
    return RNOmhMapsPluginAzuremapsView.class;
}

@end
#endif
